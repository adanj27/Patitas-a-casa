using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PatitasACasa.Application.Authentication.Commands.Register;
using PatitasACasa.Application.Authentication.Queries.Login;

namespace PatitasACasa.Api.Controllers;

[AllowAnonymous]
[ApiController]
[Route("api/auth")]
public class AuthenticationController : ApiController
{
    private readonly ISender _mediator;

    public AuthenticationController(ISender mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterCommand request)
    {
        var result = await _mediator.Send(request);
        return result.Match(v => Ok(v), e => Problem(e));
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginQuery request)
    {
        var result = await _mediator.Send(request);
        return result.Match(v => Ok(v), e => Problem(e));
    }
}
