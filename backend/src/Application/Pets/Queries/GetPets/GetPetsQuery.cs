using ErrorOr;
using MediatR;
using PatitasACasa.Domain.Pet;

namespace PatitasACasa.Application.Pets.Queries.GetPets;

public record GetPetsQuery(int PageNumber, int PageSize) : IRequest<ErrorOr<List<Pet>>>;
