namespace PatitasACasa.Application.Common.Interfaces.Services;

public interface IDateTimeProvider
{
    DateTimeOffset OffsetUtcNow { get; }
    DateTime UtcNow { get; }
}
