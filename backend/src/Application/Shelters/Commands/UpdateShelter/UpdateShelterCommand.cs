using MediatR;
using PatitasACasa.Domain.Pet;

namespace PatitasACasa.Application.Shelters.Commands.UpdateShelter;

public record UpdateShelterCommand(string name, IEnumerable<Pet> pets) : IRequest<Shelter>;
