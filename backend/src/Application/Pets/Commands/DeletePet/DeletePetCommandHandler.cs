using ErrorOr;
using MediatR;
using PatitasACasa.Application.Common.Interfaces.Persistence;
using PatitasACasa.Domain.Common.Errors;

namespace PatitasACasa.Application.Pets.Commands.DeletePet;

public class DeletePetCommandHandler : IRequestHandler<DeletePetCommand, ErrorOr<Success>>
{
    private readonly IPetRepository _petRepository;

    public DeletePetCommandHandler(IPetRepository petRepository)
    {
        _petRepository = petRepository;
    }

    public async Task<ErrorOr<Success>> Handle(
        DeletePetCommand request,
        CancellationToken cancellationToken
    )
    {
        var pet = await _petRepository.GetPetById(request.Id);
        if (pet is null)
        {
            return Errors.Pet.NotFound;
        }
        await _petRepository.DeletePet(pet);
        return Result.Success;
    }
}
