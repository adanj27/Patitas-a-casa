using PatitasACasa.Domain.Common.Models;

namespace PatitasACasa.Domain.Pet.ValueObjects;

public sealed class PetId : ValueObject
{
    public Guid Value { get; }

    private PetId(Guid value)
    {
        Value = value;
    }

    public static PetId CreateUnique() => new(Guid.NewGuid());

    public static PetId Create(Guid value) => new(value);

    public override IEnumerable<object> GetEqualityComponents()
    {
        yield return Value;
    }
}
