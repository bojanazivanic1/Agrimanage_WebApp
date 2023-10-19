using System.ComponentModel.DataAnnotations;

namespace Agrimanage.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Name is required!"), StringLength(100, MinimumLength = 5, ErrorMessage = "Name length must be between 5 and 100 characters.")]
        public string? Name { get; set; }
        [Required(ErrorMessage = "Last name is required!"), StringLength(100, MinimumLength = 5, ErrorMessage = "Last name length must be between 5 and 100 characters.")]
        public string? LastName { get; set; }
        [Required(ErrorMessage = "Email is required!"), MaxLength(100), EmailAddress]
        public string? Email { get; set; }
        [Required(ErrorMessage = "Password is required!"), MaxLength(100), RegularExpression("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]
        public string? Password { get; set; }
        public string? Salt { get; set; } = null;
        public string VerificatonCode { get; set; } = null!;
        public bool IsVerified { get; set; } = false;
        [Required(ErrorMessage = "Address is required!"), StringLength(100, MinimumLength = 10, ErrorMessage = "Address length must be between 10 and 100 characters.")]
        public string? Address { get; set; }
        public DateTime DateOfBirth { get; set; }
        [Required(ErrorMessage = "Farm name is required!"), StringLength(100, MinimumLength = 5, ErrorMessage = "Farm name length must be between 5 and 100 characters.")]
        public string? FarmName { get; set; }

        public List<Parcel>? Parcels { get; set; }
    }
}
