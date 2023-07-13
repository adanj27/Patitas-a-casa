using FluentValidation;

namespace PatitasACasa.Application.Shelters.Commands.CreateShelter;


public class CreateShelterCommandValidator
    : AbstractValidator<CreateShelterCommand> {
        
        public CreateShelterCommandValidator()
        {
        }
}
