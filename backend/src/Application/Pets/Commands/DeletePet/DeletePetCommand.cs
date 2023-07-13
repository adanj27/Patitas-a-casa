using ErrorOr;
using MediatR;

namespace PatitasACasa.Application.Pets.Commands.DeletePet;

public record DeletePetCommand(Guid Id) : IRequest<ErrorOr<Success>>;
