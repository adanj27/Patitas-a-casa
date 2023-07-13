
using MediatR;

namespace PatitasACasa.Application.Shelters.Commands.GetShelters;

public record GetSheltersQuery(int pageNumber, int pageSize) : IRequest<IEnumerable<Shelter>>;
