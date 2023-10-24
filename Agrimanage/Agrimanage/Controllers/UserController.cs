using Agrimanage.DTO.RequestDto;
using Agrimanage.DTO.ResponseDto;
using Agrimanage.Interfaces.IServices;
using Agrimanage.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Agrimanage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [Authorize]
        [HttpPost("add-parcel")]
        public async Task<ActionResult> AddParcelsync(AddParcelDto addParcelDto)
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int ownerId))
                throw new Exception("Bad ID. Logout and login.");

            await userService.AddParcelAsync(addParcelDto, ownerId);
            return Ok();
        }

        [Authorize]
        [HttpDelete("delete-parcel/{parcelId}")]
        public async Task<ActionResult> DeleteParcelAsync(int parcelId)
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int ownerId))
                throw new Exception("Bad ID. Logout and login.");

            await userService.DeleteParcelAsync(parcelId, ownerId);
            return Ok();
        }

        [Authorize]
        [HttpPut("update-parcel")]
        public async Task<ActionResult> UpdateParcelAsync(UpdateParcelDto updateParcelDto)
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int ownerId))
                throw new Exception("Bad ID. Logout and login.");

            await userService.UpdateParcelAsync(updateParcelDto, ownerId);
            return Ok();
        }

        [Authorize]
        [HttpPost("add-operation")]
        public async Task<ActionResult> AddOperationsync(AddOperationDto addOperationDto)
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int ownerId))
                throw new Exception("Bad ID. Logout and login.");

            await userService.AddOperationAsync(addOperationDto, ownerId);
            return Ok();
        }

        [Authorize]
        [HttpDelete("delete-operation/{operationId}")]
        public async Task<ActionResult> DeleteOperationAsync(int operationId)
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int ownerId))
                throw new Exception("Bad ID. Logout and login.");

            await userService.DeleteOperationAsync(operationId, ownerId);
            return Ok();
        }

        [Authorize]
        [HttpPut("update-operation")]
        public async Task<ActionResult> UpdateOperationAsync(UpdateOperationDto updateOperationDto)
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int ownerId))
                throw new Exception("Bad ID. Logout and login.");

            await userService.UpdateOperationAsync(updateOperationDto, ownerId);
            return Ok();
        }

        [Authorize]
        [HttpPut("change-status")]
        public async Task<ActionResult> ChangeStatusAsync(ChangeStatusDto changeStatusDto)
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int ownerId))
                throw new Exception("Bad ID. Logout and login.");

            await userService.ChangeStatusAsync(changeStatusDto, ownerId);
            return Ok();
        }

        [Authorize]
        [HttpGet("get-operations-owner")]
        public async Task<ActionResult> GetOperationsForOwnerAsync()
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int ownerId))
                throw new Exception("Bad ID. Logout and login.");

            List<GetOperationDto> operations = await userService.GetOperationsForOwnerAsync(ownerId);
            return Ok(operations);
        }

        [Authorize]
        [HttpGet("get-parcel/{parcelId}")]
        public async Task<ActionResult> GetParcelAsync(int parcelId)
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int ownerId))
                throw new Exception("Bad ID. Logout and login.");

            GetParcelDto parcel = await userService.GetParcelAsync(parcelId, ownerId);
            return Ok(parcel);
        }

        [Authorize]
        [HttpGet("get-parcels")]
        public async Task<ActionResult> GetParcelsAsync()
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int ownerId))
                throw new Exception("Bad ID. Logout and login.");

            List<GetParcelDto> parcels = await userService.GetParcelsAsync(ownerId);
            return Ok(parcels);
        }

        [Authorize]
        [HttpGet("get-parcel-operations/{parcelId}")]
        public async Task<ActionResult> GetParcelWithOperationsAsync(int parcelId)
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int ownerId))
                throw new Exception("Bad ID. Logout and login.");

            GetParcelDto parcel = await userService.GetParcelWithOperationsAsync(parcelId, ownerId);
            return Ok(parcel);
        }

        [Authorize]
        [HttpGet("get-operation/{operationId}")]
        public async Task<ActionResult> GetOperationAsync(int operationId)
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int ownerId))
                throw new Exception("Bad ID. Logout and login.");

            GetOperationDto operation = await userService.GetOperationAsync(operationId, ownerId);
            return Ok(operation);
        }
    }
}
