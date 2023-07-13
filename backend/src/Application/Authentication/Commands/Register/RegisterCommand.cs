using PatitasACasa.Application.Authentication.Common;
using MediatR;
using ErrorOr;

namespace PatitasACasa.Application.Authentication.Commands.Register;

public record RegisterCommand(string Username, string Email, string Password)
    : IRequest<ErrorOr<AuthenticationResult>>;
