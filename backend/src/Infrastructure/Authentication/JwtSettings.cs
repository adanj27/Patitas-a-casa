namespace PatitasACasa.Infrastructure.Authentication;

public class JwtSettings
{
    public string Secret { get; init; } = null!;
    public int ExpiryDays { get; init; }
    public string Issuer { get; init; } = null!;
    public string Audience { get; init; } = null!;
}
