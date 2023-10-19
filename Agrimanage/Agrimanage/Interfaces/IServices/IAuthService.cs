using Agrimanage.DTO.RequestDto;

namespace Agrimanage.Interfaces.IServices
{
    public interface IAuthService
    {
        Task RegisterUserAsync(RegisterUserDto registerUserDto);
        Task ConfirmEmailAsync(CodeDto codeDto);
        Task<string> LoginUserAsync(LoginUserDto loginUserDto);
        Task ResetPasswordRequestAsync(EmailDto emailDto);
        Task ResetPasswordConfirmAsync(ResetPasswordDto resetPasswordDto);
    }
}
