using PatitasACasa.Domain.Common.Models;

namespace PatitasACasa.Domain.Pet.ValueObjects;

public sealed class PetType : ValueObject
{
    public enum PetTypes
    {
        Dog,
        Cat,
        Other
    }

    public PetTypes Value { get; }

#pragma warning disable CS8618
    private PetType() { }
#pragma warning restore CS8618
    private PetType(PetTypes value)
    {
        Value = value;
    }

    public static PetType FromString(string typeName)
    {
        if (Enum.TryParse(typeof(PetTypes), typeName, true, out var result))
        {
            return new PetType((PetTypes)result);
        }
        else
        {
            throw new ArgumentException();
        }
    }

    public override string ToString()
    {
        return Value.ToString();
    }

    // public static PetType Dog = new PetType("Dog");
    // public static PetType Cat = new PetType("Cat");
    // public static PetType Other = new PetType("Other");
    public override IEnumerable<object> GetEqualityComponents()
    {
        yield return Value;
    }
}
