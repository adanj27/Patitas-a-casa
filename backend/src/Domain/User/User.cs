using PatitasACasa.Domain.Common.Models;
using PatitasACasa.Domain.User.ValueObjects;

namespace PatitasACasa.Domain.User;

public sealed class User : AggregateRoot<UserId>
{
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public UserRole Role { get; set; }

#pragma warning disable CS8618
    private User() { }
#pragma warning restore CS8618
    private User(UserId userId, string username, string email, string password, UserRole role)
        : base(userId)
    {
        Username = username;
        Email = email;
        Password = password;
        Role = role;
    }

    public static User Create(string username, string email, string password, UserRole role)
    {
        return new(UserId.CreateUnique(), username, email, password, role);
    }
}
