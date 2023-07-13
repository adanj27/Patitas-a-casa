using FluentValidation;

namespace PatitasACasa.Application.Pets.Commands.DeletePet;

public class DeletePetCommandValidator : AbstractValidator<DeletePetCommand>
{
    public DeletePetCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
    }
}
