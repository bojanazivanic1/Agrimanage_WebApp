using Agrimanage.Exceptions;
using Agrimanage.Models;
using Microsoft.EntityFrameworkCore;

namespace Agrimanage.Infrastructure
{
    public class AgrimanageDbContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public AgrimanageDbContext(IConfiguration configuration) : base()
        {
            _configuration = configuration;
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Parcel> Parcels { get; set; }
        public DbSet<Operation> Operations { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string connectionString = _configuration.GetConnectionString("AppDbContext") ??
                throw new InternalServerErrorException("Cannot connect to the database.");

            optionsBuilder.UseNpgsql(connectionString);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AgrimanageDbContext).Assembly);
        }
    }
}
