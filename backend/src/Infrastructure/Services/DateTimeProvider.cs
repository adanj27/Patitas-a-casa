using PatitasACasa.Application.Common.Interfaces.Services;

namespace PatitasACasa.Infrastructure.Services;

public class DateTimeProvider : IDateTimeProvider
{
    public DateTimeOffset OffsetUtcNow => DateTimeOffset.UtcNow;

    public DateTime UtcNow => DateTime.UtcNow;
}
