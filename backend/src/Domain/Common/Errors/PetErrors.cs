using ErrorOr;

namespace PatitasACasa.Domain.Common.Errors;

public static partial class Errors
{
    public static class Pet
    {
        public static Error NotFound =>
            Error.NotFound(code: "notFound", description: "The pet does not exist");
    }
}
