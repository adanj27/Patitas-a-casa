using FluentValidation;

using PatitasACasa.Application.Authentication.Commands.Register;
using static PatitasACasa.Application.Common.Constants.ValidationConstants;

namespace CleanApi.Application.Authentication.Commands.Register;

public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
{
    public RegisterCommandValidator()
    {
        RuleFor(x => x.Username).NotEmpty().MaximumLength(MAX_NAME_LENGTH);
        RuleFor(x => x.Email).NotEmpty().EmailAddress().MaximumLength(MAX_NAME_LENGTH);
        RuleFor(x => x.Password)
            .NotEmpty()
            .MinimumLength(AUTHENTICATION_MIN_PASSWORD_LENGTH)
            .WithMessage("Your password length must be at least 8.")
            .Matches(@"[a-z]+")
            .WithMessage("Your password must contain at least one lowercase letter.")
            .Matches(@"[0-9]+")
            .WithMessage("Your password must contain at least one number.")
            .MaximumLength(MAX_NAME_LENGTH);
    }
}
