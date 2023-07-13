using FluentValidation;
using static PatitasACasa.Domain.Pet.ValueObjects.PetSize;
using static PatitasACasa.Domain.Pet.ValueObjects.PetType;
using static PatitasACasa.Application.Common.Constants.ValidationConstants;

namespace PatitasACasa.Application.Pets.Commands.UpdatePet;

public class UpdatePetCommandValidator : AbstractValidator<UpdatePetCommand>
{
    public UpdatePetCommandValidator()
    {
        // RuleFor(x => x.Size).NotEmpty();
        // RuleFor(x => x.Contact).NotEmpty();
        // RuleFor(x => x.Zone).NotEmpty();
        // RuleFor(x => x.Date).NotEmpty();
        // RuleFor(x => x.Description).NotEmpty();
        // RuleFor(x => x.Name).NotEmpty();
        RuleFor(x => x.Name).NotEmpty().MaximumLength(MAX_NAME_LENGTH);
        RuleFor(x => x.Date).NotEmpty();
        RuleFor(x => x.Zone).NotEmpty().MaximumLength(MAX_NAME_LENGTH);
        RuleFor(x => x.Contact).NotEmpty();
        RuleFor(x => x.Description).NotEmpty().MaximumLength(MAX_NAME_LENGTH);
        RuleFor(x => x.Size).NotEmpty().IsEnumName(typeof(PetSizes), caseSensitive: false);
        RuleFor(x => x.Type).NotEmpty().IsEnumName(typeof(PetTypes), caseSensitive: false);
        RuleFor(x => x.PetImage)
            .NotEmpty()
            .Must(x => x.Length < MAX_FILESIZE)
            .WithMessage("Image too large, max filesize: 10 MB")
            .Must(x => x.ContentType.StartsWith("image/"))
            .WithMessage("Invalid image format");
        RuleFor(x => x.Age).NotEmpty().LessThan(100);
    }
}
