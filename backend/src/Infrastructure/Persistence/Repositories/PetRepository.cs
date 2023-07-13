using Microsoft.EntityFrameworkCore;
using PatitasACasa.Application.Common.Interfaces.Persistence;
using PatitasACasa.Domain.Pet;
using PatitasACasa.Domain.Pet.ValueObjects;

namespace PatitasACasa.Infrastructure.Persistence.Repositories;

public class PetRepository : IPetRepository
{
    private readonly PatitasACasaDbContext _dbContext;

    public PetRepository(PatitasACasaDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task CreatePet(Pet pet)
    {
        await _dbContext.Pets.AddAsync(pet);
        await _dbContext.SaveChangesAsync();
    }

    public async Task DeletePet(Pet pet)
    {
        _dbContext.Pets.Remove(pet);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<Pet?> GetPetById(Guid id)
    {
        return await _dbContext.Pets.FindAsync(PetId.Create(id));
    }

    public async Task<List<Pet>> GetPets(int pageNumber, int pageSize)
    {
        var skip = (pageNumber - 1) * pageSize;
        return await _dbContext.Pets.OrderBy(p => p.Id).Skip(skip).Take(pageSize).ToListAsync();
    }

    public async Task UpdatePet(Pet pet)
    {
        _dbContext.Pets.Update(pet);
        await _dbContext.SaveChangesAsync();
    }
}
