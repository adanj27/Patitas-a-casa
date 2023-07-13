using ErrorOr;
using FluentValidation;
using FluentValidation.Results;
using MediatR;

namespace PatitasACasa.Application.Common.Behaviors;

public sealed class ValidationBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
    where TResponse : IErrorOr
{
    private readonly IValidator<TRequest>? _validator;

    public ValidationBehavior(IValidator<TRequest>? validator = null)
    {
        _validator = validator;
    }

    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken
    )
    {
        if (_validator is null)
        {
            return await next();
        }

        var validationResult = await _validator.ValidateAsync(request, cancellationToken);

        if (validationResult.IsValid)
        {
            return await next();
        }
        var errors = validationResult.Errors.ConvertAll(
            ValidationFailure =>
                Error.Validation(ValidationFailure.PropertyName, ValidationFailure.ErrorMessage)
        );
        return (dynamic)errors;
    }
}
