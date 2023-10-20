using Agrimanage.DTO.ResponseDto;
using Agrimanage.DTO.RequestDto;
using Agrimanage.Models;
using AutoMapper;

namespace Agrimanage.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, RegisterUserDto>().ReverseMap();
            CreateMap<Parcel, AddParcelDto>().ReverseMap();
            CreateMap<Operation, AddOperationDto>().ReverseMap();
            CreateMap<Operation, GetOperationDto>().ReverseMap();
            CreateMap<Operation, UpdateOperationDto>().ReverseMap();
            CreateMap<Parcel, GetParcelDto>().ReverseMap();
        }
    }
}
