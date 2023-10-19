using Agrimanage.DTO.RequestDto;
using Agrimanage.Exceptions;
using Agrimanage.Interfaces.IRepository;
using Agrimanage.Interfaces.IServices;
using Agrimanage.Models;
using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Security.Application;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Agrimanage.Services
{
    public class AuthService : IAuthService
    {
        private static IEmailService _emailService;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public AuthService(IConfiguration configuration,
                           IMapper mapper,
                           IEmailService emailService,
                           IUnitOfWork unitOfWork)
        {
            _configuration = configuration;
            _mapper = mapper;
            _emailService = emailService;
            _unitOfWork = unitOfWork;
        }

        public async Task RegisterUserAsync(RegisterUserDto registerUserDto)
        {
            if ((await _unitOfWork.Users.Get(x => x.Email == registerUserDto.Email)) != null)
                throw new BadRequestException("That email is already in use!");

            User user = _mapper.Map<User>(registerUserDto);

            user.Name = Sanitizer.GetSafeHtmlFragment(user.Name);
            user.LastName = Sanitizer.GetSafeHtmlFragment(user.LastName);
            user.Address = Sanitizer.GetSafeHtmlFragment(user.Address);
            user.FarmName = Sanitizer.GetSafeHtmlFragment(user.FarmName);

            user.Salt = BCrypt.Net.BCrypt.GenerateSalt();
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password, user.Salt);
            user.VerificatonCode = Math.Abs(Guid.NewGuid().GetHashCode()).ToString().Substring(0, 6);

            await _unitOfWork.Users.Add(user);
            await _unitOfWork.Save();

            await SendCodeByEmailAsync(user.Email!, user.VerificatonCode);
        }

        public async Task ConfirmEmailAsync(CodeDto codeDto)
        {
            User user = await _unitOfWork.Users.Get(x => x.Email == codeDto.Email) ??
                throw new BadRequestException("User doesn't exist.");

            if (!user.VerificatonCode.Equals(codeDto.Code))
            {
                throw new BadRequestException("Invalid code.");
            }

            user.IsVerified = true;

            await _unitOfWork.Save();
        }

        public async Task<string> LoginUserAsync(LoginUserDto loginUserDto)
        {
            User user = await _unitOfWork.Users.Get(x => x.Email == loginUserDto.Email) ??
                throw new BadRequestException("User not found.");

            if (BCrypt.Net.BCrypt.HashPassword(loginUserDto.Password, user.Salt) != user.Password)
            {
                throw new BadRequestException("Wrong password.");
            }

            if (!user.IsVerified)
            {
                throw new UnauthorizedException("Not verified!");
            }

            return CreateToken(user);
        }

        public async Task ResetPasswordRequestAsync(EmailDto emailDto) 
        {
            User user = await _unitOfWork.Users.Get(x => x.Email == emailDto.Email) ??
                throw new BadRequestException("User not found.");

            if (!user.IsVerified)
                throw new BadRequestException("User with that email is not verified yet.");

            user.VerificatonCode = Math.Abs(Guid.NewGuid().GetHashCode()).ToString().Substring(0, 6);
            _unitOfWork.Users.Update(user);
            await _unitOfWork.Save();

            await SendCodeByEmailAsync(user.Email!, user.VerificatonCode);
        }

        public async Task ResetPasswordConfirmAsync(ResetPasswordDto resetPasswordDto)
        {
            var user = await _unitOfWork.Users.Get(x => x.Email == resetPasswordDto.Email) ??
                throw new BadRequestException("User doesn't exist.");

            if (resetPasswordDto.Code != user.VerificatonCode)
            {
                throw new BadRequestException("Code is not valid!");
            }

            user.Password = BCrypt.Net.BCrypt.HashPassword(resetPasswordDto.Password!, user.Salt!);

            await _unitOfWork.Save();
        }

        public async Task<bool> SendCodeByEmailAsync(string email, string code)
        {
            try
            {
                string subject = "Authentication Code";
                string body = $"<html><body><p>Your 2FA code is:</p><h1>{code}</h1></body></html>";

                await _emailService!.SendEmail(email, subject, body);
                return true;
            }
            catch (Exception ex)
            {
                throw new InternalServerErrorException("Failed to send code.\n" + ex.Message);
            }
        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim("Id", user.Id.ToString()),
                new Claim("Email", user.Email!),
            };
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("JwtSettings:Token").Value!));
            var token = new JwtSecurityToken(
                issuer: _configuration["JwtSettings:Issuer"],
                audience: _configuration["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature)
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
