using FluentValidation;
using static PatitasACasa.Application.Common.Constants.ValidationConstants;

namespace PatitasACasa.Application.Authentication.Queries.Login;

public class LoginQueryValidator : AbstractValidator<LoginQuery>
{
    public LoginQueryValidator()
    {
        RuleFor(x => x.Email).NotEmpty().MaximumLength(MAX_NAME_LENGTH);
        RuleFor(x => x.Password).NotEmpty().MaximumLength(MAX_NAME_LENGTH);
    }
}
