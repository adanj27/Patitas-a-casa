namespace backendtest.Repositories;

using backendtest.Models;
public interface IDogRepository {
    Task<IEnumerable<Dog>> GetAll();
    Task<Dog> GetById(int id);
    Task Create(Dog dog);
    Task Update(Dog dog);
    Task Delete(int id);
}
