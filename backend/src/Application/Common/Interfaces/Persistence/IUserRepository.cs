using PatitasACasa.Domain.User;

namespace PatitasACasa.Application.Common.Interfaces.Persistence;

public interface IUserRepository
{
    Task<User?> GetUserByEmail(string email);
    Task CreateUser(User user);
}
