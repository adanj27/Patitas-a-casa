using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PatitasACasa.Infrastructure.Services;
using PatitasACasa.Infrastructure.Persistence;
using PatitasACasa.Infrastructure.Persistence.Repositories;
using PatitasACasa.Application.Common.Interfaces.Services;
using PatitasACasa.Application.Common.Interfaces.Persistence;
using PatitasACasa.Application.Common.Interfaces.Authentication;
using PatitasACasa.Infrastructure.Authentication;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Options;

namespace PatitasACasa.Api;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        ConfigurationManager configuration
    )
    {
        services.AddDbContext<PatitasACasaDbContext>(
            options => options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"))
        );
        services.AddHttpContextAccessor();
        services.AddJwtAuthentication(configuration);
        services.AddSingleton<IDateTimeProvider, DateTimeProvider>();
        services.AddScoped<IPetRepository, PetRepository>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IBlogRepository, BlogRepository>();
        services.AddScoped<IUrlProvider, UrlProvider>();
        services.AddSingleton<ICardGenerator, CardGenerator>();
        services.AddSingleton<IJwtTokenGenerator, JwtTokenGenerator>();
        return services;
    }

    private static IServiceCollection AddJwtAuthentication(
        this IServiceCollection services,
        ConfigurationManager configuration
    )
    {
        var jwtSettings = new JwtSettings();
        configuration.Bind("JwtSettings", jwtSettings);
        services.AddSingleton(Options.Create(jwtSettings));
        services.AddSingleton<IJwtTokenGenerator, JwtTokenGenerator>();
        services
            .AddAuthentication(defaultScheme: JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = jwtSettings.Issuer,
                    ValidateAudience = true,
                    ValidAudience = jwtSettings.Audience,
                    ValidateIssuerSigningKey = true,
                    ValidateLifetime = true,
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(jwtSettings.Secret)
                    )
                };
            });

        return services;
    }
}
