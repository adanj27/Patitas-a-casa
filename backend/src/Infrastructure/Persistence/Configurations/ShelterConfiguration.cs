using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PatitasACasa.Domain.Shelter.ValueObjects;

namespace PatitasACasa.Infrastructure.Persistence.Configurations;

public class ShelterConfiguration : IEntityTypeConfiguration<Shelter>
{
    public void Configure(EntityTypeBuilder<Shelter> builder)
    {
        builder.ToTable("Shelters");
        builder.HasKey(s => s.Id);
        builder.Property(s => s.Id).ValueGeneratedNever().HasConversion(
                 s => s.Value,
                 value => ShelterId.Create(value)
                );
        builder.Property(s => s.Name).HasMaxLength(255);
    }
}
