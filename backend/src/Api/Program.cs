using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using PatitasACasa.Api;
using PatitasACasa.Api.Middleware;
using PatitasACasa.Application;
using PatitasACasa.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddPresentation();
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);

var app = builder.Build();

app.UseMiddleware<ErrorHandlingMiddleware>();
app.UseHttpsRedirection();

var filesDirectory = Path.Combine(builder.Environment.ContentRootPath, "files");
if (!Directory.Exists(filesDirectory))
{
    Directory.CreateDirectory(filesDirectory);
}
app.UseStaticFiles(
    new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(filesDirectory),
        RequestPath = "/api/files"
    }
);

app.UseRouting();
app.UseRequestLocalization();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// temporal solution
System.Threading.Thread.Sleep(TimeSpan.FromSeconds(10));

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<PatitasACasaDbContext>();
    if (context.Database.GetPendingMigrations().Any())
    {
        context.Database.Migrate();
    }
}

app.Run();
