using MediatR;

namespace PatitasACasa.Application.Shelters.Commands.GetShelterById;

public record GetShelterByIdQueryHandler : IRequestHandler<GetShelterByIdQuery, Shelter>
{
    public Task<Shelter> Handle(GetShelterByIdQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
