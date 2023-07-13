using MediatR;

namespace PatitasACasa.Application.Shelters.Commands.CreateShelter;

public class CreateShelterCommandHandler : IRequestHandler<CreateShelterCommand, Shelter>
{
    public Task<Shelter> Handle(CreateShelterCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}

