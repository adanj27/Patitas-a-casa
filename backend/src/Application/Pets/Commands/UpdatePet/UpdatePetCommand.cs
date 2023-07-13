using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace PatitasACasa.Application.Pets.Commands.UpdatePet;

public record UpdatePetCommand(
    Guid Id,
    string Name,
    string Description,
    string Zone,
    IFormFile PetImage,
    string Type,
    string Size,
    string Contact,
    DateTime Date,
    Guid? ShelterId,
    int Age
) : IRequest<ErrorOr<Success>>;
