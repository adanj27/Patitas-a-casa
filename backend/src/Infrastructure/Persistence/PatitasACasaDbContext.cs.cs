using Microsoft.EntityFrameworkCore;
using PatitasACasa.Domain.Pet;
using PatitasACasa.Domain.User;

namespace PatitasACasa.Infrastructure.Persistence;

public class PatitasACasaDbContext : DbContext {
    public PatitasACasaDbContext(DbContextOptions<PatitasACasaDbContext> options) : base(options) {}
    public DbSet<Pet> Pets { get; set; } = null!;
    public DbSet<Shelter> Shelters { get; set; } = null!;
    public DbSet<User> Users { get; set; } = null!;
    protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(PatitasACasaDbContext).Assembly);
            base.OnModelCreating(modelBuilder);
        }
}
