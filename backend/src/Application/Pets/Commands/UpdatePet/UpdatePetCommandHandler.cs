using ErrorOr;
using MediatR;
using PatitasACasa.Application.Common.Interfaces.Persistence;
using PatitasACasa.Application.Common.Interfaces.Services;
using PatitasACasa.Domain.Common.Errors;
using PatitasACasa.Domain.Pet.ValueObjects;
using PatitasACasa.Domain.Shelter.ValueObjects;
using static PatitasACasa.Application.Common.Constants.DirectoryConstants;

namespace PatitasACasa.Application.Pets.Commands.UpdatePet;

public class UpdatePetCommandHandler : IRequestHandler<UpdatePetCommand, ErrorOr<Success>>
{
    private readonly IPetRepository _petRepository;
    private readonly IUrlProvider _urlProvider;

    public UpdatePetCommandHandler(IPetRepository petRepository, IUrlProvider urlProvider)
    {
        _petRepository = petRepository;
        _urlProvider = urlProvider;
    }

    public async Task<ErrorOr<Success>> Handle(
        UpdatePetCommand request,
        CancellationToken cancellationToken
    )
    {
        var p = await _petRepository.GetPetById(request.Id);
        if (p is null)
        {
            return Errors.Pet.NotFound;
        }
        var fsurl = _urlProvider.CreateFilesystemUrl(PETS_DIR, request.PetImage.FileName);
        using (var stream = new FileStream(fsurl, FileMode.Create))
        {
            await request.PetImage.CopyToAsync(stream);
        }

        p.Name = request.Name;
        p.ImageUrl = _urlProvider.CreateHttpResponseUrl(fsurl);
        p.Contact = request.Contact;
        p.Date = request.Date;
        p.Size = PetSize.FromString(request.Size);
        p.ShelterId = request.ShelterId is not null
            ? ShelterId.Create(request.ShelterId.Value)
            : null;
        p.Zone = request.Zone;
        p.Age = request.Age;
        p.Type = PetType.FromString(request.Type);

        await _petRepository.UpdatePet(p);
        return Result.Success;
    }
}
