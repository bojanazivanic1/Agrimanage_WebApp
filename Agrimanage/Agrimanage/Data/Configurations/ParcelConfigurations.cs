using Agrimanage.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;

namespace Agrimanage.Infrastructure.Configurations
{
    public class ParcelConfigurations : IEntityTypeConfiguration<Parcel>
    {
        public void Configure(EntityTypeBuilder<Parcel> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).IsRequired().HasMaxLength(100);
            builder.Property(x => x.ParcelNumber).IsRequired();
            builder.HasIndex(x => x.ParcelNumber).IsUnique();
            builder.Property(x => x.Size).IsRequired();
            builder.HasOne(x => x.Owner).WithMany(x => x.Parcels).HasForeignKey(x => x.OwnerId).OnDelete(DeleteBehavior.Cascade);
            builder.Property(x => x.Coordinates).HasColumnName("Coordinates").HasConversion(
                v => JsonConvert.SerializeObject(v),
                v => JsonConvert.DeserializeObject<List<Point>>(v)
            );
        }
    }
}
