using Agrimanage.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Agrimanage.Infrastructure.Configurations
{
    public class OperationConfiguration : IEntityTypeConfiguration<Operation>
    {
        public void Configure(EntityTypeBuilder<Operation> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).IsRequired().HasMaxLength(100);
            builder.Property(x => x.Status).IsRequired().HasConversion(new EnumToStringConverter<EStatus>());
            builder.Property(x => x.Description).IsRequired();
            builder.HasOne(x => x.Parcel).WithMany(x => x.Operations).HasForeignKey(x => x.ParcelId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
