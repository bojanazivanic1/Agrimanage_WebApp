﻿using Agrimanage.Models;
using System.ComponentModel.DataAnnotations;

namespace Agrimanage.DTO.ResponseDto
{
    public class GetParcelDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Parcel name is required!"), StringLength(100, MinimumLength = 5, ErrorMessage = "Parcel name length must be between 5 and 100 characters.")]
        public string? Name { get; set; }
        [Required(ErrorMessage = "Number of parcel is required!")]
        public int ParcelNumber { get; set; }
        [Required(ErrorMessage = "Size is required!")]
        public double Size { get; set; }
        [Required(ErrorMessage = "Coordinates are required!")]
        public List<Point>? Coordinates { get; set; }
        public int OwnerId { get; set; }
        public List<GetOperationDto>? Operations { get; set; }
    }
}
