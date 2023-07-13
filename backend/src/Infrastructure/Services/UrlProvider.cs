using Microsoft.AspNetCore.Http;
using PatitasACasa.Application.Common.Interfaces.Services;

namespace PatitasACasa.Infrastructure.Services;

public class UrlProvider : IUrlProvider
{
    private const string RootPath = "files";
    private readonly HttpContext? _httpContext;
    private readonly IDateTimeProvider _dateTimeProvider;

    public UrlProvider(IHttpContextAccessor httpContext, IDateTimeProvider dateTimeProvider)
    {
        _httpContext = httpContext.HttpContext;
        _dateTimeProvider = dateTimeProvider;
    }

    public string CreateFilesystemUrl(string dir, string url)
    {
        var fn = _dateTimeProvider.OffsetUtcNow.ToUnixTimeMilliseconds();
        var ext = Path.GetExtension(url);
        return Path.Combine(RootPath, dir, $"{fn}{ext}");
    }

    public string CreateHttpResponseUrl(string fsUrl)
    {
        var scheme = _httpContext?.Request.Scheme;
        var host = _httpContext?.Request.Host;
        var fullurl = $"{scheme}://{host}/api/{fsUrl}";
        return fullurl;
    }
}
