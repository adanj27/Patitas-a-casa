using PatitasACasa.Domain.Common.Models;

namespace PatitasACasa.Domain.Pet.ValueObjects;

public sealed class PetSize : ValueObject
{
    public enum PetSizes
    {
        Large,
        Medium,
        Small
    }

    public PetSizes Value { get; }

#pragma warning disable CS8618
    private PetSize() { }
#pragma warning restore CS8618
    private PetSize(PetSizes value)
    {
        Value = value;
    }

    public static PetSize FromString(string roleName)
    {
        if (Enum.TryParse(typeof(PetSizes), roleName, true, out var result))
        {
            return new PetSize((PetSizes)result);
        }
        else
        {
            throw new ArgumentException($"{roleName} is not valid.");
        }
    }

    public override string ToString()
    {
        return Value.ToString();
    }

    // public static PetSize Large = new PetSize(PetSizes.Large);
    // public static PetSize Medium = new PetSize(PetSizes.Medium);
    // public static PetSize Small = new PetSize(PetSizes.Small);
    public override IEnumerable<object> GetEqualityComponents()
    {
        yield return Value;
    }
}
