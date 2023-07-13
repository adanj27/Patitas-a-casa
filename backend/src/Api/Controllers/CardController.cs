using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MediatR;
using PatitasACasa.Application.Card.Queries.GenerateCard;

namespace PatitasACasa.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CardController : ApiController
{
    private readonly ISender _mediator;

    public CardController(ISender mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("generate")]
    [AllowAnonymous]
    public async Task<IActionResult> GenerateCard([FromForm] CardQuery request)
    {
        var result = await _mediator.Send(request);
        return result.Match(r => File(r, "image/png"), e => Problem(e));
    }
}
