namespace PatitasACasa.Application.Shelters.Commands.DeleteShelter;

using MediatR;
public record DeleteShelterCommand(Guid id) : IRequest<Shelter>;
