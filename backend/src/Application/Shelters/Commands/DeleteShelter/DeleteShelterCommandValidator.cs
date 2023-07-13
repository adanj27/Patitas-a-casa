using FluentValidation;

namespace PatitasACasa.Application.Shelters.Commands.DeleteShelter;

public class CreateShelterCommandValidator
    : AbstractValidator<DeleteShelterCommand> {
        
        public CreateShelterCommandValidator()
        {
        }
}
