using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Http;
using PatitasACasa.Domain.Pet;

namespace PatitasACasa.Application.Pets.Commands.CreatePet;

public record CreatePetCommand(
    string Name,
    string Description,
    string Zone,
    IFormFile PetImage,
    string Type,
    string Size,
    string Contact,
    DateTimeOffset Date,
    Guid? ShelterId,
    int Age
) : IRequest<ErrorOr<Pet>>;
