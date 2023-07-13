using PatitasACasa.Application.Pets.Commands.CreatePet;

using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using PatitasACasa.Application.Pets.Queries.GetPetById;
using PatitasACasa.Application.Pets.Queries.GetPets;
using PatitasACasa.Application.Pets.Commands.UpdatePet;
using PatitasACasa.Application.Pets.Commands.DeletePet;

namespace PatitasACasa.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PetsController : ApiController
{
    private readonly ISender _mediator;

    public PetsController(ISender mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("{id:guid}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetPetById([FromRoute] GetPetByIdQuery request)
    {
        var result = await _mediator.Send(request);
        return result.Match(r => Ok(r), errors => Problem(errors));
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetPets([FromQuery] GetPetsQuery request)
    {
        var result = await _mediator.Send(request);
        return result.Match(r => Ok(r), errors => Problem(errors));
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreatePet([FromForm] CreatePetCommand request)
    {
        var result = await _mediator.Send(request);
        return result.Match(
            r =>
                CreatedAtAction(nameof(GetPetById), routeValues: new { id = r.Id.Value }, value: r),
            errors => Problem(errors)
        );
    }

    [HttpPut("{id:guid}")]
    [Authorize]
    public async Task<IActionResult> UpdatePet(
        [FromRoute] Guid id,
        [FromForm] UpdatePetCommand request
    )
    {
        request = request with { Id = id };
        var result = await _mediator.Send(request);
        return result.Match(_ => NoContent(), errors => Problem(errors));
    }

    [HttpDelete("{id:guid}")]
    [Authorize]
    public async Task<IActionResult> DeletePet([FromRoute] DeletePetCommand request)
    {
        var result = await _mediator.Send(request);
        return result.Match(_ => NoContent(), errors => Problem(errors));
    }
}
