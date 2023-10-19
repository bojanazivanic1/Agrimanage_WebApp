using System.ComponentModel.DataAnnotations;

namespace Agrimanage.Models
{
    public enum EStatus { PLANNED, IN_PROGRESS, COMPLETED }
    public class Operation
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required!"), StringLength(100, MinimumLength = 5, ErrorMessage = "Name length must be between 5 and 100 characters.")]
        public string? Name { get; set; }
        [Required(ErrorMessage = "Description is required!"), StringLength(1000, ErrorMessage = "Description length must be less than 100 characters.")]
        public string? Description { get; set; }
        public EStatus Status { get; set; }
        public int ParcelId { get; set; }
        public Parcel? Parcel { get; set; }
    }
}
