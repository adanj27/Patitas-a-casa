namespace PatitasACasa.Application.Common.Interfaces.Persistence;

public interface IShelterRepository
{
    Task<Shelter?> GetShelterById(string email);
    Task<IEnumerable<Shelter>?> GetShelters(Shelter shelter);
    Task CreateShelter(Shelter shelter);
    Task UpdateShelter(Shelter shelter);
    Task DeleteShelter(Shelter shelter);
}
