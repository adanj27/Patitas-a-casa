using PatitasACasa.Domain.Common.Models;

namespace PatitasACasa.Domain.User.ValueObjects;

public sealed class UserRole : ValueObject
{
    public enum UserRoles
    {
        User,
        Administrator
    }
    public UserRoles Value { get; }

    private UserRole(UserRoles value)
    {
        Value = value;
    }

    public static readonly UserRole Administrator = new UserRole(UserRoles.Administrator);
    public static readonly UserRole User = new UserRole(UserRoles.User);

    public static UserRole FromString(string roleName)
    {
        if (Enum.TryParse(typeof(UserRoles), roleName, true, out var result))
        {
            return new UserRole((UserRoles)result);
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
    public override IEnumerable<object> GetEqualityComponents()
    {
        yield return Value;
    }
}
