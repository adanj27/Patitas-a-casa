using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PatitasACasa.Application.Shelters.Commands.CreateShelter;
using PatitasACasa.Application.Shelters.Commands.DeleteShelter;
using PatitasACasa.Application.Shelters.Commands.GetShelterById;
using PatitasACasa.Application.Shelters.Commands.GetShelters;
using PatitasACasa.Application.Shelters.Commands.UpdateShelter;

namespace PatitasACasa.Api.Controllers;

[Route("api/[controller]")]
public class ShelterController : ControllerBase
{
    private readonly ISender _mediator;

    public ShelterController(ISender mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("{id:guid}")]
    [AllowAnonymous]
    public IActionResult GetShelterById([FromRoute] GetShelterByIdQuery request)
    {
        throw new NotImplementedException();
    }

    [HttpGet]
    [AllowAnonymous]
    public IActionResult GetShelters([FromQuery] GetSheltersQuery request)
    {
        throw new NotImplementedException();
    }

    [HttpPost]
    [Authorize(Roles = "Administrator")]
    public IActionResult CreateShelter([FromBody] CreateShelterCommand request)
    {
        throw new NotImplementedException();
    }

    [HttpPut]
    [Authorize(Roles = "Administrator")]
    public IActionResult UpdateShelter([FromBody] UpdateShelterCommand request)
    {
        throw new NotImplementedException();
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Roles = "Administrator")]
    public IActionResult DeleteShelter([FromRoute] DeleteShelterCommand request)
    {
        throw new NotImplementedException();
    }
}
