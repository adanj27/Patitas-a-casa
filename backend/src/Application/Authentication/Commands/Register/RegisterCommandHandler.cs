using ErrorOr;
using MediatR;
using PatitasACasa.Application.Authentication.Common;
using PatitasACasa.Application.Common.Interfaces.Authentication;
using PatitasACasa.Application.Common.Interfaces.Persistence;
using PatitasACasa.Domain.User;
using PatitasACasa.Domain.Common.Errors;
using PatitasACasa.Domain.User.ValueObjects;

namespace PatitasACasa.Application.Authentication.Commands.Register;

public class RegisterCommandHandler
    : IRequestHandler<RegisterCommand, ErrorOr<AuthenticationResult>>
{
    private readonly IJwtTokenGenerator _jwtTokenGenerator;
    private readonly IUserRepository _userRepository;

    public RegisterCommandHandler(
        IJwtTokenGenerator jwtTokenGenerator,
        IUserRepository userRepository
    )
    {
        _jwtTokenGenerator = jwtTokenGenerator;
        _userRepository = userRepository;
    }

    public async Task<ErrorOr<AuthenticationResult>> Handle(
        RegisterCommand request,
        CancellationToken cancellationToken
    )
    {
        if (await _userRepository.GetUserByEmail(request.Email) is not null)
        {
            return Errors.User.DuplicateEmail;
        }
        var user = User.Create(request.Username, request.Email, request.Password, UserRole.User);
        await _userRepository.CreateUser(user);
        var token = _jwtTokenGenerator.GenerateToken(user);
        return new AuthenticationResult(user, token);
    }
}
