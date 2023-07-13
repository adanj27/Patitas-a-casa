using PatitasACasa.Domain.Common.Models;

namespace PatitasACasa.Domain.Shelter.ValueObjects;

public sealed class ShelterId : ValueObject {
    public Guid Value { get; }
    private ShelterId(Guid value) {
        Value = value;
    }
    public static ShelterId CreateUnique() => new(Guid.NewGuid());
    public static ShelterId Create(Guid value) => new(value);
    public override IEnumerable<object> GetEqualityComponents() {
        yield return Value;
    }
}
