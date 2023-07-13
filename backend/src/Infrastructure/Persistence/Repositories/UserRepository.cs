using PatitasACasa.Application.Common.Interfaces.Persistence;
using PatitasACasa.Domain.User;
using Microsoft.EntityFrameworkCore;

namespace PatitasACasa.Infrastructure.Persistence.Repositories;

public class UserRepository : IUserRepository
{
    private readonly PatitasACasaDbContext _dbContext;

    public UserRepository(PatitasACasaDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task CreateUser(User user)
    {
        await _dbContext.AddAsync(user);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<User?> GetUserByEmail(string email)
    {
        return await _dbContext.Users.SingleOrDefaultAsync(u => u.Email == email);
    }
}
