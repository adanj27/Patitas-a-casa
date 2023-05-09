namespace backendtest.Middleware;

using System.Net;
using System.Text.Json;

public class ErrorHandlerMiddleware {
    private readonly RequestDelegate _next;

    public ErrorHandlerMiddleware(RequestDelegate next) {
        _next = next;
    }

    public async Task Invoke(HttpContext context) {
        try {
            await _next(context);
        } catch (KeyNotFoundException) {
            context.Response.StatusCode = (int)HttpStatusCode.NotFound;
            await WriteErrorResponse(context.Response, "Dog not found");
        } catch (Exception ex) {
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            await WriteErrorResponse(context.Response, ex.Message);
        }
    }

    private static async Task WriteErrorResponse(HttpResponse response, string errorMessage) {
        response.ContentType = "application/json";
        var errorResponse = new { message = errorMessage };
        var json = JsonSerializer.Serialize(errorResponse);
        await response.WriteAsync(json);
    }
}
