using ErrorOr;
using MediatR;
using PatitasACasa.Application.Common.Interfaces.Persistence;
using PatitasACasa.Domain.Pet;

namespace PatitasACasa.Application.Pets.Queries.GetPets;

public class GetPetsQueryHandler : IRequestHandler<GetPetsQuery, ErrorOr<List<Pet>>>
{
    private readonly IPetRepository _petRepository;

    public GetPetsQueryHandler(IPetRepository petRepository)
    {
        _petRepository = petRepository;
    }

    public async Task<ErrorOr<List<Pet>>> Handle(
        GetPetsQuery request,
        CancellationToken cancellationToken
    )
    {
        return await _petRepository.GetPets(request.PageNumber, request.PageSize);
    }
}
