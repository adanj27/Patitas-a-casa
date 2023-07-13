using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PatitasACasa.Domain.User;
using PatitasACasa.Domain.User.ValueObjects;

namespace PatitasACasa.Infrastructure.Persistence.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("Users");
        builder.HasKey(u => u.Id);
        builder.Property(u => u.Id)
            .HasConversion(
                    id => id.Value,
                    value => UserId.Create(value)
                );
        builder.Property(u => u.Email);
        builder.Property(u => u.Password);
        builder.Property(u => u.Username);
        builder.Property(u => u.Role)
            .HasConversion(
                    r => r.ToString(),
                    v => UserRole.FromString(v)
                );
    }
}
