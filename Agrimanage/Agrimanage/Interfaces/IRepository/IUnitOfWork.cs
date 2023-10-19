using Agrimanage.Models;
using Microsoft.Extensions.Hosting;

namespace Agrimanage.Interfaces.IRepository
{
    public interface IUnitOfWork
    {
        IRepository<User> Users { get; }
        IRepository<Parcel> Parcels { get; }
        IRepository<Operation> Operations { get; }

        Task Save();
    }
}
