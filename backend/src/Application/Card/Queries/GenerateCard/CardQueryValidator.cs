using FluentValidation;
using PatitasACasa.Application.Common.Constants;

namespace PatitasACasa.Application.Card.Queries.GenerateCard;

public class CardQueryValidator : AbstractValidator<CardQuery>
{
    public CardQueryValidator()
    {
        RuleFor(x => x.ImageFile)
            .NotEmpty()
            .Must(x => x.Length < ValidationConstants.MAX_FILESIZE)
            .WithMessage("Image demasiado grande, tamaño máximo: 10MB")
            .Must(x => x.ContentType.StartsWith("image/"))
            .WithMessage("Invalid image format");
        RuleFor(x => x.Name).NotEmpty().MaximumLength(ValidationConstants.CARD_MAX_NAME);
        RuleFor(x => x.Date).NotEmpty();
        RuleFor(x => x.Zone).NotEmpty().MaximumLength(ValidationConstants.CARD_MAX_ZONE);
        RuleFor(x => x.Contact).NotEmpty().MaximumLength(ValidationConstants.CARD_MAX_CONTACT);
        RuleFor(x => x.Description)
            .NotEmpty()
            .MaximumLength(ValidationConstants.CARD_MAX_DESCRIPTION);
        RuleFor(x => x.Size).NotEmpty();
    }
}
