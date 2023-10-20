using System.ComponentModel.DataAnnotations;

namespace Agrimanage.DTO.RequestDto
{
    public class AddParcelDto
    {
        [Required(ErrorMessage = "Parcel name is required!"), StringLength(100, MinimumLength = 5, ErrorMessage = "Parcel name length must be between 5 and 100 characters.")]
        public string? Name { get; set; }
        [Required(ErrorMessage = "Number of parcel is required!")]
        public int ParcelNumber { get; set; }
        [Required(ErrorMessage = "Size is required!")]
        public int Size { get; set; }

        //public List<AddOperationDto>? Operations { get; set; }
    }
}
