namespace backendtest.Profiles;

using AutoMapper;
using backendtest.Models;
public class DogToDogDtoResponseResolver : IValueResolver<Dog, DogDtoResponse, string> {
    private readonly IHttpContextAccessor _httpContextAccessor;

    public DogToDogDtoResponseResolver(IHttpContextAccessor httpContextAccessor) {
        _httpContextAccessor = httpContextAccessor;
    }

    public string Resolve(Dog source, DogDtoResponse destination, string destMember,
                          ResolutionContext context) {
        var request =
            _httpContextAccessor.HttpContext?.Request ?? throw new ArgumentNullException();
        return $"{request.Scheme}://{request.Host}/api/images/{source.ImageName}";
    }
}
