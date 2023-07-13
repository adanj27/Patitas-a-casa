using ErrorOr;
using MediatR;
using PatitasACasa.Application.Common.Interfaces.Persistence;
using PatitasACasa.Domain.Pet;
using PatitasACasa.Domain.Common.Errors;

namespace PatitasACasa.Application.Pets.Queries.GetPetById;

public class GetPetByIdQueryHandler : IRequestHandler<GetPetByIdQuery, ErrorOr<Pet>>
{
    private readonly IPetRepository _petRepository;

    public GetPetByIdQueryHandler(IPetRepository petRepository)
    {
        _petRepository = petRepository;
    }

    public async Task<ErrorOr<Pet>> Handle(
        GetPetByIdQuery request,
        CancellationToken cancellationToken
    )
    {
        var pet = await _petRepository.GetPetById(request.Id);
        if (pet is null)
        {
            return Errors.Pet.NotFound;
        }
        return pet;
    }
}
