using FluentValidation;

namespace PatitasACasa.Application.Shelters.Commands.GetShelterById;

public class GetShelterByIdQueryValidator
    : AbstractValidator<GetShelterByIdQuery> {
        
        public GetShelterByIdQueryValidator()
        {
        }
}
