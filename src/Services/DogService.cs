namespace backendtest.Services;

using AutoMapper;
using backendtest.Dtos;
using backendtest.Models;
using backendtest.Repositories;

public interface IDogService {
    Task<IEnumerable<DogDtoResponse>> GetAll();
    Task<DogDtoResponse?> GetById(int id);
    Task<Stream> Create(DogDtoRequest model);
    Task Update(int id, DogDtoRequest model);
    Task Delete(int id);
}

public class DogService : IDogService {
    private readonly IDogRepository _dogRepository;
    private readonly IMapper _mapper;
    private readonly IImageService _imageService;

    public DogService(IDogRepository dogRepository, IMapper mappper, IImageService imageService) {
        _dogRepository = dogRepository;
        _mapper = mappper;
        _imageService = imageService;
    }

    public async Task<IEnumerable<DogDtoResponse>> GetAll() {
        var dogs = await _dogRepository.GetAll();
        var dogsRes = _mapper.Map<IEnumerable<DogDtoResponse>>(dogs);
        return dogsRes;
    }

    public async Task<DogDtoResponse?> GetById(int id) {
        var dog = await _dogRepository.GetById(id);
        if (dog == null) {
            throw new KeyNotFoundException();
        }
        var dogRes = _mapper.Map<DogDtoResponse>(dog);
        return dogRes;
    }

    public async Task<Stream> Create(DogDtoRequest model) {
        var dog = _mapper.Map<Dog>(model);
        // Why not use model.Image.Filename? Because we don't want to save the real filename, after
        // the map dog.ImageName contain the name in Unix ms format.
        var image = _imageService.GetNewImage(model.Image, dog.ImageName);
        await _dogRepository.Create(dog);
        return image;
    }
    public async Task Update(int id, DogDtoRequest model) {
        var dog = await _dogRepository.GetById(id);
        if (dog == null) {
            throw new KeyNotFoundException("Dog not found");
        }
        _mapper.Map(model, dog);
        await _dogRepository.Update(dog);
    }
    public async Task Delete(int id) {
        var dog = await _dogRepository.GetById(id);
        if (dog == null) {
            throw new KeyNotFoundException("Dog not found");
        }
        await _dogRepository.Delete(id);
    }
}
