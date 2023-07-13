using System.Text.Json;
using PatitasACasa.Api.Middleware;

namespace PatitasACasa.Api;

public static class DependencyInjection
{
    public static IServiceCollection AddPresentation(this IServiceCollection services)
    {
        services
            .AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                options.JsonSerializerOptions.DictionaryKeyPolicy = JsonNamingPolicy.CamelCase;
                options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
                options.JsonSerializerOptions.WriteIndented = true;
            });
        services.AddSingleton<ErrorHandlingMiddleware>();
        services.AddRouting(o => o.LowercaseUrls = true);
        services.AddRequestLocalization(o =>
        {
            var supportedCultures = new string[] { "es" };
            o.AddSupportedCultures(supportedCultures);
            o.AddSupportedUICultures(supportedCultures);
            o.SetDefaultCulture("es");
        });
        return services;
    }
}
