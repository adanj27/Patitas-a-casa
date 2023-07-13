using MediatR;
using PatitasACasa.Domain.Pet;

namespace PatitasACasa.Application.Shelters.Commands.CreateShelter;
public record CreateShelterCommand(string Name, IEnumerable<Pet> Pets) : IRequest<Shelter>;
