using Agrimanage.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Agrimanage.Infrastructure.Configurations
{
    public class ParcelConfigurations : IEntityTypeConfiguration<Parcel>
    {
        public void Configure(EntityTypeBuilder<Parcel> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).IsRequired().HasMaxLength(100);
            builder.Property(x => x.ParcelNumber).IsRequired();
            builder.Property(x => x.Size).IsRequired();
            builder.HasOne(x => x.Owner).WithMany(x => x.Parcels).HasForeignKey(x => x.OwnerId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
