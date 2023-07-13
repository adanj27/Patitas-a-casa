using ErrorOr;
using MediatR;
using PatitasACasa.Application.Authentication.Common;

namespace PatitasACasa.Application.Authentication.Queries.Login;

public record LoginQuery(string Email, string Password) : IRequest<ErrorOr<AuthenticationResult>>;
