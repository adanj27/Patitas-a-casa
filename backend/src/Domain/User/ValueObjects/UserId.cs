using PatitasACasa.Domain.Common.Models;

namespace PatitasACasa.Domain.User.ValueObjects;

public sealed class UserId : ValueObject {
  public Guid Value { get; }

  private UserId(Guid value) { Value = value; }
  public static UserId CreateUnique() { return new(Guid.NewGuid()); }
  public static UserId Create(Guid value) { return new(value); }

  public override IEnumerable<object> GetEqualityComponents() {
    yield return Value;
  }
}
