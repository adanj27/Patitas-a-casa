namespace PatitasACasa.Domain.Common.Models;

public abstract class Entity<TId> : IEquatable<Entity<TId>>
    where TId : notnull {
    public TId Id { get; protected set; }
#pragma warning disable CS8618
    protected Entity(){}
#pragma warning restore CS8618
    protected Entity(TId id) {
        Id = id;
    }
    public override bool Equals(object? obj) {
        return this.Equals(obj as Entity<TId>);
    }
    public bool Equals(Entity<TId>? other) {
        return other is null ? false : Id.Equals(other.Id);
    }
    public static bool operator ==(Entity<TId> left, Entity<TId> right) {
        return left.Equals(right);
    }
    public static bool operator !=(Entity<TId> left, Entity<TId> right) {
        return !left.Equals(right);
    }
    public override int GetHashCode() {
        return Id.GetHashCode();
    }
}
