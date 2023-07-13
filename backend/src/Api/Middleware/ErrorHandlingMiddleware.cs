using System.Text.Json;

namespace PatitasACasa.Api.Middleware;

public sealed class ErrorHandlingMiddleware : IMiddleware
{
    private readonly ILogger<ErrorHandlingMiddleware> _logger;

    public ErrorHandlingMiddleware(ILogger<ErrorHandlingMiddleware> logger)
    {
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (Exception e)
        {
            var response = new
            {
                title = "Internal Server Error",
                status = 500,
                description = "No description",
                errors = (object?)null,
            };
            _logger.LogError(e, e.Message);
            context.Response.StatusCode = 500;
            await context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
    }
}
