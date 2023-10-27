using Agrimanage.DTO.RequestDto;
using Agrimanage.DTO.ResponseDto;
using Agrimanage.Exceptions;
using Agrimanage.Interfaces.IRepository;
using Agrimanage.Interfaces.IServices;
using Agrimanage.Models;
using AutoMapper;
using System;

namespace Agrimanage.Services
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public UserService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        public async Task AddParcelAsync(AddParcelDto addParcelDto, int ownerId)
        {
            User user = await GetUser(ownerId);

            Parcel parcel = _mapper.Map<Parcel>(addParcelDto);
            parcel.OwnerId = ownerId;

            Parcel parcelWithSameNumber = await _unitOfWork.Parcels.Get(x => x.ParcelNumber == addParcelDto.ParcelNumber);
            if (parcelWithSameNumber != null)
                throw new BadRequestException("This parcel number already exists.");

            if (!IsPolygonConvex(parcel.Coordinates))
                throw new BadRequestException("The parcel needs to be a convex polygon.");

            parcel.Size = CalculateParcelSize(parcel.Coordinates);

            await _unitOfWork.Parcels.Add(parcel);
            await _unitOfWork.Save();
        }

        public async Task DeleteParcelAsync(int parcelId, int ownerId)
        {
            User user = await GetUser(ownerId);

            Parcel parcel = await _unitOfWork.Parcels.Get(x => x.Id == parcelId) ??
                throw new NotFoundException("Parcel not found.");

            if (parcel.OwnerId != ownerId)
                throw new UnauthorizedException("You do not have permission to delete this parcel.");

            _unitOfWork.Parcels.Delete(parcel);
            await _unitOfWork.Save();
        }

        public async Task UpdateParcelAsync(UpdateParcelDto updateParcelDto, int ownerId)
        {
            User user = await GetUser(ownerId);

            Parcel parcel = await _unitOfWork.Parcels.Get(x => x.Id == updateParcelDto.Id, new() { "Operations" }) ??
                throw new NotFoundException("Parcel not found.");

            if (parcel.OwnerId != ownerId)
                throw new UnauthorizedException("You do not have permission to update this parcel.");

            Parcel parcelWithSameNumber = await _unitOfWork.Parcels.Get(x => x.ParcelNumber == updateParcelDto.ParcelNumber && x.Id != updateParcelDto.Id);
            if (parcelWithSameNumber != null)
                throw new Exception("This parcel number already exists.");

            if (!IsPolygonConvex(updateParcelDto.Coordinates!))
                throw new BadRequestException("The parcel needs to be a convex polygon.");

            parcel.Name = updateParcelDto.Name;
            parcel.ParcelNumber = updateParcelDto.ParcelNumber;
            parcel.Size = CalculateParcelSize(updateParcelDto.Coordinates!);
            parcel.Coordinates = updateParcelDto.Coordinates!;
            
            _unitOfWork.Parcels.Update(parcel);
            await _unitOfWork.Save();
        }

        public async Task ChangeStatusAsync(ChangeStatusDto changeStatusDto, int ownerId)
        {
            User user = await GetUser(ownerId);

            Parcel parcel = await _unitOfWork.Parcels.Get(x => x.Id == changeStatusDto.ParcelId) ??
                throw new NotFoundException("Parcel not found.");

            Operation operation = await _unitOfWork.Operations.Get(x => x.Id == changeStatusDto.OperationId) ??
                throw new NotFoundException("Operation not found.");

            if (operation.Parcel != null && operation.ParcelId != changeStatusDto.ParcelId)
                throw new BadRequestException("The operation does not belong to this parcel.");
            
            if (operation.Parcel!.OwnerId != ownerId)
                throw new UnauthorizedException("You do not have permission to change status for this operation.");

            if (operation.Status == EStatus.COMPLETED && changeStatusDto.Status != EStatus.COMPLETED)
                throw new BadRequestException("The operation is completed yet.");

            if (operation.Status == EStatus.IN_PROGRESS && changeStatusDto.Status == EStatus.PLANNED)
                throw new BadRequestException("The operation is in progress yet.");

            operation.Status = changeStatusDto.Status;

            _unitOfWork.Operations.Update(operation);
            await _unitOfWork.Save();
        }

        public async Task AddOperationAsync(AddOperationDto addOperationDto, int ownerId)
        {
            User user = await GetUser(ownerId);

            Parcel parcel = await _unitOfWork.Parcels.Get(x => x.Id == addOperationDto.ParcelId) ??
                throw new NotFoundException("Parcel not found.");

            if (parcel.OwnerId != ownerId)
                throw new UnauthorizedException("You do not have permission to add an operation to this parcel.");

            Operation operation = _mapper.Map<Operation>(addOperationDto);
            operation.ParcelId = parcel.Id;
            operation.Status = EStatus.PLANNED;

            await _unitOfWork.Operations.Add(operation);
            await _unitOfWork.Save();
        }

        public async Task UpdateOperationAsync(UpdateOperationDto updateOperationDto, int ownerId)
        {
            User user = await GetUser(ownerId);

            Operation operation = await _unitOfWork.Operations.Get(x => x.Id == updateOperationDto.Id) ??
                throw new NotFoundException("Operation not found.");

            if (operation.Parcel != null && operation.Parcel.OwnerId != ownerId)
                throw new UnauthorizedException("You do not have permission to update this operation.");

            _mapper.Map(updateOperationDto, operation);

            _unitOfWork.Operations.Update(operation);
            await _unitOfWork.Save();
        }

        public async Task DeleteOperationAsync(int operationId, int ownerId)
        {
            User user = await GetUser(ownerId);

            Operation operation = await _unitOfWork.Operations.Get(x => x.Id == operationId) ??
                throw new NotFoundException("Operation not found.");

            if (operation.Parcel != null && operation.Parcel.OwnerId != ownerId)
                throw new UnauthorizedException("You do not have permission to delete this operation.");

            _unitOfWork.Operations.Delete(operation);
            await _unitOfWork.Save();
        }

        public async Task<List<GetOperationDto>> GetOperationsForOwnerAsync(int ownerId)
        {
            User user = await GetUser(ownerId);

            IList<Operation> operations = await _unitOfWork.Operations.GetAll(x => x.Parcel!.OwnerId == ownerId);
            List<GetOperationDto> operationDtos = _mapper.Map<List<GetOperationDto>>(operations);

            foreach (var operationDto in operationDtos)
            {
                Parcel parcel = await _unitOfWork.Parcels.Get(x => x.Id == operationDto.ParcelId);

                operationDto.ParcelName = parcel.Name!;
            }

            return operationDtos;
        }

        public async Task<GetParcelDto> GetParcelAsync(int parcelId, int ownerId)
        {
            User user = await GetUser(ownerId);

            Parcel parcel = await _unitOfWork.Parcels.Get(x => x.Id == parcelId) ??
                throw new NotFoundException("Parcel not found.");

            if (parcel.OwnerId != ownerId)
                throw new UnauthorizedException("You do not have permission to access this parcel.");

            return _mapper.Map<GetParcelDto>(parcel);
        }

        public async Task<List<GetParcelDto>> GetParcelsAsync(int ownerId)
        {
            User user = await GetUser(ownerId);

            IList<Parcel> parcels = await _unitOfWork.Parcels.GetAll(x => x.OwnerId == ownerId);

            return _mapper.Map<List<GetParcelDto>>(parcels);
        }

        public async Task<GetParcelDto> GetParcelWithOperationsAsync(int parcelId, int ownerId)
        {
            User user = await GetUser(ownerId);

            Parcel parcel = await _unitOfWork.Parcels.Get(x => x.Id == parcelId, new() { "Operations" }) ??
                throw new NotFoundException("Parcel not found.");

            if (parcel.OwnerId != ownerId)
                throw new UnauthorizedException("You do not have permission to access this parcel.");

            GetParcelDto parcelDto = _mapper.Map<GetParcelDto>(parcel);
            parcelDto.Operations = _mapper.Map<List<GetOperationDto>>(parcel.Operations);

            return parcelDto;
        }

        public async Task<GetOperationDto> GetOperationAsync(int operationId, int ownerId)
        {
            User user = await GetUser(ownerId);

            Operation operation = await _unitOfWork.Operations.Get(x => x.Id == operationId) ??
                throw new NotFoundException("Operation not found.");

            Parcel parcel = await _unitOfWork.Parcels.Get(x => x.Id == operation.ParcelId) ??
                throw new NotFoundException("Parcel not found.");

            if (parcel.OwnerId != ownerId)
                throw new UnauthorizedException("You do not have permission to access this operation.");

            GetOperationDto operationDto = _mapper.Map<GetOperationDto>(operation);
            operationDto.ParcelName = parcel.Name!;

            return operationDto;
        }

        private async Task<User> GetUser(int userId)
        {
            User user = await _unitOfWork.Users.Get(x => x.Id == userId);
            if (user == null)
                throw new NotFoundException("User not found");
            return user;
        }

        private static bool IsPolygonConvex(List<Point> coordinates)
        {
            int n = coordinates.Count;

            if (n < 3) return false;

            bool isClockwise = false;
            bool isCounterClockwise = false;

            for (int i = 0; i < n; i++)
            {
                double dx1 = coordinates[(i + 1) % n].X - coordinates[i].X;
                double dy1 = coordinates[(i + 1) % n].Y - coordinates[i].Y;
                double dx2 = coordinates[(i + 2) % n].X - coordinates[i].X;
                double dy2 = coordinates[(i + 2) % n].Y - coordinates[i].Y;

                double crossProduct = dx1 * dy2 - dx2 * dy1;

                if (crossProduct < 0)
                {
                    isClockwise = true;
                }
                else if (crossProduct > 0)
                {
                    isCounterClockwise = true;
                }

                if (isClockwise && isCounterClockwise)
                {
                    return false;
                }
            }

            return true;
        }

        public static double CalculateParcelSize(List<Point> coordinates)
        {
            int numPoints = coordinates.Count;
            if (numPoints < 3)
                throw new BadRequestException("There is no polygon.");

            double area = 0.0;
            for (int i = 0; i < numPoints; i++)
            {
                Point currentPoint = coordinates[i];
                Point nextPoint = coordinates[(i + 1) % numPoints];
                area += (currentPoint.X * nextPoint.Y) - (nextPoint.X * currentPoint.Y);
            }

            area = Math.Abs(area) / 2.0;

            double areaInHectares = area * 1000000;

            return Math.Round(areaInHectares, 3);
        }
    }
}
