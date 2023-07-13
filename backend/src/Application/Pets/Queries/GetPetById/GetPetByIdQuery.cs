using ErrorOr;
using MediatR;
using PatitasACasa.Domain.Pet;

namespace PatitasACasa.Application.Pets.Queries.GetPetById;

public record GetPetByIdQuery(Guid Id) : IRequest<ErrorOr<Pet>>;
