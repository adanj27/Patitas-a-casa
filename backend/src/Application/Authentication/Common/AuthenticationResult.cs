using PatitasACasa.Domain.User;

namespace PatitasACasa.Application.Authentication.Common;

public record AuthenticationResult(User user, string Token);
