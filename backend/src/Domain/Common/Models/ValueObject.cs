namespace PatitasACasa.Domain.Common.Models;

public abstract class ValueObject : IEquatable<ValueObject> {
    public abstract IEnumerable<object> GetEqualityComponents();
    public override bool Equals(object? obj) {
        return this.Equals(obj as ValueObject);
    }
    public bool Equals(ValueObject? other) {
        if (other is null || GetType() != other.GetType()) {
            return false;
        }
        return GetEqualityComponents().SequenceEqual(other.GetEqualityComponents());
    }
    public static bool operator ==(ValueObject left, ValueObject right) {
        return left.Equals(right);
    }
    public static bool operator !=(ValueObject left, ValueObject right) {
        return !left.Equals(right);
    }
    public override int GetHashCode() {
        return GetEqualityComponents()
            .Select(x => x?.GetHashCode() ?? 0)
            .Aggregate((x, y) => x ^ y);
    }
}