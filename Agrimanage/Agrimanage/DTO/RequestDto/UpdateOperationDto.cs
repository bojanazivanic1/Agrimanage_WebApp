using Agrimanage.Models;
using System.ComponentModel.DataAnnotations;

namespace Agrimanage.DTO.RequestDto
{
    public class UpdateOperationDto
    {
        [Required]
        public int Id { get; set; }
        public string? Name { get; set; }
        [Required(ErrorMessage = "Description is required!"), StringLength(1000, ErrorMessage = "Description length must be less than 100 characters.")]
        public string? Description { get; set; }
    }
}
