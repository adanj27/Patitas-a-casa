using PatitasACasa.Domain.Pet;

namespace PatitasACasa.Application.Common.Interfaces.Persistence;

public interface IPetRepository
{
    Task<Pet?> GetPetById(Guid id);
    Task<List<Pet>> GetPets(int pageNumber, int pageSize);
    Task CreatePet(Pet pet);
    Task UpdatePet(Pet pet);
    Task DeletePet(Pet pet);
}
