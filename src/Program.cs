using backendtest.Repositories;
using backendtest.Services;
using backendtest.Data;
using MySqlConnector;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.FileProviders;
using backendtest.Middleware;

var builder = WebApplication.CreateBuilder(args);

{
    var services = builder.Services;
    services.AddCors();
    services.AddControllers();
    // connection to the database
    var connection =
        new MySqlConnection(builder.Configuration.GetConnectionString("DefaultConnection"));
    services.AddSingleton<MySqlConnection>(
        _ => connection);

    // for the custom resolver in /Profiles/DogToDogDtoResponseResolver.cs
    services.AddHttpContextAccessor();
    services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
    services.AddSingleton<DataContext>();
    // for imageservice.cs
    services.AddSingleton<FileExtensionContentTypeProvider>();

    services.AddScoped<IDogRepository, DogRepository>();
    services.AddScoped<IDogService, DogService>();
    services.AddScoped<IImageService, ImageService>();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
}

var app = builder.Build();
{
    // initiliaze database
    using var scope = app.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<DataContext>();
    await context.Init();
}

if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => x.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
// app.UseStatusCodePages();

app.UseMiddleware<ErrorHandlerMiddleware>();

app.UseHttpsRedirection();

{
    // static files
    var path = Path.Combine(Directory.GetCurrentDirectory(), "results");
    if (!Directory.Exists(path)) {
        Directory.CreateDirectory(path);
    }
    app.UseStaticFiles(new StaticFileOptions() {
        FileProvider = new PhysicalFileProvider(path),
        RequestPath = "/api/images",
    });
}

app.UseAuthorization();

app.MapControllers();

app.Run();
