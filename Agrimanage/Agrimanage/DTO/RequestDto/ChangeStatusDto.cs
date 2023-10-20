using Agrimanage.Models;
using System.ComponentModel.DataAnnotations;

namespace Agrimanage.DTO.RequestDto
{
    public class ChangeStatusDto
    {
        [Required]
        public int OperationId { get; set; }
        [Required]
        public int ParcelId { get; set; }
        [Required]
        public EStatus Status { get; set; }
    }
}
