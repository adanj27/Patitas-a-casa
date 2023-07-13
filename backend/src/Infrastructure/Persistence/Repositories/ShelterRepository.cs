
using PatitasACasa.Application.Common.Interfaces.Persistence;

namespace PatitasACasa.Infrastructure.Persistence.Repositories;

public class ShelterRepository : IShelterRepository
{
    public Task CreateShelter(Shelter shelter)
    {
        throw new NotImplementedException();
    }

    public Task DeleteShelter(Shelter shelter)
    {
        throw new NotImplementedException();
    }

    public Task<Shelter?> GetShelterById(string email)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<Shelter>?> GetShelters(Shelter shelter)
    {
        throw new NotImplementedException();
    }

    public Task UpdateShelter(Shelter shelter)
    {
        throw new NotImplementedException();
    }
}
