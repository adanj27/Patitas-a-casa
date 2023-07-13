using ErrorOr;
using MediatR;
using PatitasACasa.Application.Common.Interfaces.Persistence;
using PatitasACasa.Application.Common.Interfaces.Services;
using static PatitasACasa.Application.Common.Constants.DirectoryConstants;
using PatitasACasa.Domain.Pet;
using PatitasACasa.Domain.Pet.ValueObjects;
using PatitasACasa.Domain.Shelter.ValueObjects;

namespace PatitasACasa.Application.Pets.Commands.CreatePet;

public class CreatePetCommandHandler : IRequestHandler<CreatePetCommand, ErrorOr<Pet>>
{
    private readonly IPetRepository _petRepository;
    private readonly IUrlProvider _urlProvider;

    public CreatePetCommandHandler(IPetRepository petRepository, IUrlProvider urlProvider)
    {
        _petRepository = petRepository;
        _urlProvider = urlProvider;
    }

    public async Task<ErrorOr<Pet>> Handle(
        CreatePetCommand request,
        CancellationToken cancellationToken
    )
    {
        var fsurl = _urlProvider.CreateFilesystemUrl(PETS_DIR, request.PetImage.FileName);
        var directoryPath = Path.GetDirectoryName(fsurl)!;
        Directory.CreateDirectory(directoryPath);
        using (var stream = new FileStream(fsurl, FileMode.Create))
        {
            await request.PetImage.CopyToAsync(stream);
        }
        var pet = Pet.Create(
            name: request.Name,
            imageUrl: _urlProvider.CreateHttpResponseUrl(fsurl),
            contact: request.Contact,
            date: request.Date,
            size: PetSize.FromString(request.Size),
            shelterId: request.ShelterId is not null
                ? ShelterId.Create(request.ShelterId.Value)
                : null,
            description: request.Description,
            zone: request.Zone,
            age: request.Age,
            type: PetType.FromString(request.Type)
        );
        await _petRepository.CreatePet(pet);
        return pet;
    }
}
