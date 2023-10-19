using System.ComponentModel.DataAnnotations;

namespace Agrimanage.DTO.RequestDto
{
    public class EmailDto
    {
        [Required(ErrorMessage = "Email is required!"), MaxLength(100), EmailAddress]
        public string? Email { get; set; }
    }
}
