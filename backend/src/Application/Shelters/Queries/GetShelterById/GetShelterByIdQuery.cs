using MediatR;

namespace PatitasACasa.Application.Shelters.Commands.GetShelterById;

public record GetShelterByIdQuery(Guid Id) : IRequest<Shelter>;
