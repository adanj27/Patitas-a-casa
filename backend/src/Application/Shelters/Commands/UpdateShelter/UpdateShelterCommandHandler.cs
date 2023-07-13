namespace PatitasACasa.Application.Shelters.Commands.UpdateShelter;

using System.Threading;
using System.Threading.Tasks;
using MediatR;
public class UpdateShelterCommandHandler : IRequestHandler<UpdateShelterCommand, Shelter>
{
    public Task<Shelter> Handle(UpdateShelterCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
