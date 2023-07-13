using FluentValidation;
using static PatitasACasa.Application.Common.Constants.ValidationConstants;

namespace PatitasACasa.Application.Pets.Queries.GetPets;

public class GetPetsQueryValidator : AbstractValidator<GetPetsQuery>
{
    public GetPetsQueryValidator()
    {
        RuleFor(x => x.PageSize)
            .NotEmpty()
            .GreaterThan(0)
            .WithMessage("El número de página tiene que ser mayor que 0")
            .LessThanOrEqualTo(MAX_PAGE_SIZE)
            .WithMessage($"El tamaño de página máximo es {MAX_PAGE_SIZE}.");
        RuleFor(x => x.PageNumber)
            .NotEmpty()
            .GreaterThan(0)
            .WithMessage("El número de página tiene que ser mayor que 0");
    }
}
