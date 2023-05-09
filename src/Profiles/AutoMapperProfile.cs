namespace backendtest.Profiles;

using AutoMapper;
using backendtest.Models;
using backendtest.Dtos;

public class AutoMapperProfile : Profile {
    public AutoMapperProfile() {
        CreateMap<DogDtoRequest, Dog>().ForMember(
            dog => dog.ImageName,
            opt => opt.MapFrom(src => GetFileNameMiliseconds(src.Image.FileName)));
        CreateMap<Dog, DogDtoResponse>().ForMember(
            dtoRes => dtoRes.ImageUrl, opt => opt.MapFrom<DogToDogDtoResponseResolver>());
    }
    private string GetFileNameMiliseconds(string fileName) {
        return DateTimeOffset.UtcNow.ToUnixTimeMilliseconds().ToString() +
               Path.GetExtension(fileName);
    }
}
