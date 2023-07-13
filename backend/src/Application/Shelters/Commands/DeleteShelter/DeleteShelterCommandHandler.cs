namespace PatitasACasa.Application.Shelters.Commands.DeleteShelter;

using System.Threading;
using System.Threading.Tasks;
using MediatR;
public class DeleteShelterCommandHandler : IRequestHandler<DeleteShelterCommand, Shelter>
{
    public Task<Shelter> Handle(DeleteShelterCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
