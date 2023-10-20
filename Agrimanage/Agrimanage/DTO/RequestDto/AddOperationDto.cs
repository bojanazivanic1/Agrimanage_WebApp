using Agrimanage.Models;
using System.ComponentModel.DataAnnotations;

namespace Agrimanage.DTO.RequestDto
{
    public class AddOperationDto
    {
        [Required]
        public int ParcelId { get; set; }
        [Required(ErrorMessage = "Name is required!"), StringLength(100, MinimumLength = 5, ErrorMessage = "Name length must be between 5 and 100 characters.")]
        public string? Name { get; set; }
        [Required(ErrorMessage = "Description is required!"), StringLength(1000, ErrorMessage = "Description length must be less than 100 characters.")]
        public string? Description { get; set; }
    }
}
