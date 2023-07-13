using ErrorOr;

namespace PatitasACasa.Domain.Common.Errors;

public static partial class Errors
{
    public static class User
    {
        public static Error NotFound =>
            Error.NotFound(code: "notFound", description: "The user does not exist");
        public static Error DuplicateEmail =>
            Error.Validation(code: "duplicateEmail", description: "The email is already in use");
        public static Error InvalidCredentials =>
            Error.Validation(
                code: "invalidCredentials",
                description: "The email or password are incorrect."
            );
    }
}
