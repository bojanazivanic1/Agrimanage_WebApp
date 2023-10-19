using Agrimanage.DTO.RequestDto;
using Agrimanage.Interfaces.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Agrimanage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService authService;

        public AuthController(IAuthService authService)
        {
            this.authService = authService;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult> RegisterAsync(RegisterUserDto registerUserDto)
        {
            await authService.RegisterUserAsync(registerUserDto);
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("confirm-email")]
        public async Task<ActionResult> ConfirmEmailAsync(CodeDto request)
        {
            await authService.ConfirmEmailAsync(request);
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult> LoginAsync(LoginUserDto loginUserDto)
        {
            string token = await authService.LoginUserAsync(loginUserDto);
            return Ok(token);
        }

        [AllowAnonymous]
        [HttpPost("password-reset")]
        public async Task<ActionResult> ResetPasswordRequestAsync(EmailDto emailDto)
        {
            await authService.ResetPasswordRequestAsync(emailDto);
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("password-confirm")]
        public async Task<ActionResult> ResetPasswordConfirmAsync(ResetPasswordDto resetPasswordDto)
        {
            await authService.ResetPasswordConfirmAsync(resetPasswordDto);
            return Ok();
        }
    }
}
