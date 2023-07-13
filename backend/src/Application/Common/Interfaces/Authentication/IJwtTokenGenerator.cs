using PatitasACasa.Domain.User;

namespace PatitasACasa.Application.Common.Interfaces.Authentication;

public interface IJwtTokenGenerator
{
    string GenerateToken(User user);
}
