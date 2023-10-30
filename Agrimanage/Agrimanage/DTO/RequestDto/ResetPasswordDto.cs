﻿using System.ComponentModel.DataAnnotations;

namespace Agrimanage.DTO.RequestDto
{
    public class ResetPasswordDto
    {
        [Required(ErrorMessage = "Code is required!"), MaxLength(6)]
        public string? Code { get; set; }
        [Required(ErrorMessage = "Email is required!"), MaxLength(100), EmailAddress]
        public string? Email { get; set; }
        [Required(ErrorMessage = "Password is required!"), MaxLength(100), RegularExpression("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$", 
            ErrorMessage = "The password should contain a lowercase and uppercase letter, a number, and a special character.")]
        public string? Password { get; set; }
        [Required(ErrorMessage = "Confirm password is required!"), Compare("Password", ErrorMessage = "Passwords must match!")]
        public string? ConfirmPassword { get; set; }
    }
}
