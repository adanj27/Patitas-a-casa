using PatitasACasa.Domain.Common.Models;

namespace PatitasACasa.Domain.Blog.ValueObjects;

public sealed class BlogId : ValueObject {
  public Guid Value { get; }

  private BlogId(Guid value) { Value = value; }
  public static BlogId CreateUnique() => new(Guid.NewGuid());

  public override IEnumerable<object> GetEqualityComponents() {
    yield return Value;
  }
}