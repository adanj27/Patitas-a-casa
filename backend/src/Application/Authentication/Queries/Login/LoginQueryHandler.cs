using MediatR;
using PatitasACasa.Application.Authentication.Common;
using PatitasACasa.Application.Common.Interfaces.Authentication;
using PatitasACasa.Application.Common.Interfaces.Persistence;
using PatitasACasa.Domain.User;
using PatitasACasa.Domain.Common.Errors;
using ErrorOr;

namespace PatitasACasa.Application.Authentication.Queries.Login;

public class LoginQueryHandler : IRequestHandler<LoginQuery, ErrorOr<AuthenticationResult>>
{
    private readonly IJwtTokenGenerator _jwtTokenGenerator;
    private readonly IUserRepository _userRepository;

    public LoginQueryHandler(IJwtTokenGenerator jwtTokenGenerator, IUserRepository userRepository)
    {
        _jwtTokenGenerator = jwtTokenGenerator;
        _userRepository = userRepository;
    }

    public async Task<ErrorOr<AuthenticationResult>> Handle(
        LoginQuery request,
        CancellationToken cancellationToken
    )
    {
        if (await _userRepository.GetUserByEmail(request.Email) is not User user)
        {
            return Errors.User.InvalidCredentials;
        }
        if (user.Password != request.Password)
        {
            return Errors.User.InvalidCredentials;
        }
        var token = _jwtTokenGenerator.GenerateToken(user);
        return new AuthenticationResult(user, token);
    }
}
