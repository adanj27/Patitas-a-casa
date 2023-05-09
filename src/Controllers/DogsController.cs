namespace backendtest.Controllers;

using Microsoft.AspNetCore.Mvc;
using backendtest.Services;
using backendtest.Dtos;

[ApiController]
[Route("api/dogs")]
public class DogsController : ControllerBase {
    private IDogService _dogService;
    private IImageService _imageService;

    public DogsController(IDogService dogService, IImageService imageService) {
        _dogService = dogService;
        _imageService = imageService;
    }
    [HttpGet]
    public async Task<IActionResult> GetAll() {
        var users = await _dogService.GetAll();
        return Ok(users);
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] int id) {
        var user = await _dogService.GetById(id);
        return Ok(user);
    }
    [HttpPost]
    public async Task<IActionResult> Create([FromForm] DogDtoRequest model) {
        var stream = await _dogService.Create(model);
        var contentType = _imageService.GetContentType(model.Image.FileName);
        return new FileStreamResult(stream, contentType);
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromForm] DogDtoRequest model) {
        await _dogService.Update(id, model);
        return Ok(new { message = "Dog Updated" });
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete([FromRoute] int id) {
        await _dogService.Delete(id);
        return Ok(new { message = "Dog Deleted" });
    }
}
