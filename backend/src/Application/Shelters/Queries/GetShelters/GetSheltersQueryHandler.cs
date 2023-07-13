using MediatR;

namespace PatitasACasa.Application.Shelters.Commands.GetShelters;

public class GetSheltersQueryHandler : IRequestHandler<GetSheltersQuery, IEnumerable<Shelter>>
{
    public Task<IEnumerable<Shelter>> Handle(GetSheltersQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}

