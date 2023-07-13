using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using PatitasACasa.Domain.Pet;
using PatitasACasa.Domain.Pet.ValueObjects;

namespace PatitasACasa.Infrastructure.Persistence.Configurations;

public class PetConfiguration : IEntityTypeConfiguration<Pet>
{
    public void Configure(EntityTypeBuilder<Pet> builder)
    {
        builder.ToTable("Pets");
        builder.HasKey(m => m.Id);
        builder
            .Property(m => m.Id)
            .ValueGeneratedNever()
            .HasConversion(id => id.Value, value => PetId.Create(value));
        builder.Property(m => m.Name);
        builder.Property(m => m.Description);
        builder.Property(m => m.Age);
        builder.Property(m => m.Zone);
        builder.Property(m => m.Contact);
        builder
            .Property(m => m.Size)
            .HasConversion(s => s.ToString(), size => PetSize.FromString(size));
        builder.Property(m => m.ImageUrl);
        builder
            .Property(m => m.Type)
            .HasConversion(t => t.ToString(), type => PetType.FromString(type));
        builder
            .HasOne<Shelter>()
            .WithMany(m => m.Pets)
            .HasForeignKey(p => p.ShelterId)
            .IsRequired(false);
        builder
            .Property(m => m.Date)
            .HasConversion(src => src.ToUniversalTime(), dst => dst.ToLocalTime());
    }
}
