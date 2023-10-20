using Agrimanage.DTO.RequestDto;
using Agrimanage.DTO.ResponseDto;
using Agrimanage.Models;

namespace Agrimanage.Interfaces.IServices
{
    public interface IUserService
    {
        Task AddParcelAsync(AddParcelDto addParcelDto, int ownerId);
        Task DeleteParcelAsync(int parcelId, int ownerId);
        Task UpdateParcelAsync(UpdateParcelDto updateParcelDto, int ownerId);
        Task ChangeStatusAsync(ChangeStatusDto changeStatusDto, int ownerId);
        Task<List<GetOperationDto>> GetOperationsForOwnerAsync(int ownerId);
        Task<GetParcelDto> GetParcelWithOperationsAsync(int parcelId, int ownerId);
        Task DeleteOperationAsync(int operationId, int ownerId);
        Task AddOperationAsync(AddOperationDto addOperationDto, int ownerId);
        Task UpdateOperationAsync(UpdateOperationDto updateOperationDto, int ownerId);
        Task<GetOperationDto> GetOperationAsync(int operationId, int ownerId);
        Task<GetParcelDto> GetParcelAsync(int parcelId, int ownerId);
    }
}
