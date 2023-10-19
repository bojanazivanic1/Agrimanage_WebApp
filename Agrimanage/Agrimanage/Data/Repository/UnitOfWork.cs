using Agrimanage.Infrastructure;
using Agrimanage.Interfaces.IRepository;
using Agrimanage.Models;
using Microsoft.Extensions.Hosting;

namespace Agrimanage.Data.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        readonly AgrimanageDbContext _dbContext;

        public IRepository<User> Users { get; }

        public IRepository<Parcel> Parcels { get; }

        public IRepository<Operation> Operations { get; }

        public UnitOfWork(AgrimanageDbContext dbContext, IRepository<User> users, IRepository<Parcel> parcels, IRepository<Operation> operations)
        {
            _dbContext = dbContext;
            Users = users;
            Parcels = parcels;
            Operations = operations;
        }

        public async Task Save()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}
