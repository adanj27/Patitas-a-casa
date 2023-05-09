// namespace backendtest.Controllers;
// using Microsoft.AspNetCore.Mvc;
// using backendtest.Services;

/// <summary>
/// Provides access to the stored images.
/// </summary>
// [ApiController]
// [Route("api/images")]
// public class ImageController : ControllerBase {
//     private readonly IImageService _imageService;
//
//     public ImageController(IImageService imageService) {
//         _imageService = imageService;
//     }
//
//     /// <summary>
//     /// Return an static image.
//     /// </summary>
//     /// <param name="fileName">The filename.</param>
//     /// <returns>The raw image corresponding to the file name.</returns>
//     [HttpGet("{filename}")]
//     public IActionResult GetImage([FromRoute] string fileName) {
//         var imageFilePath = Path.Combine("results", fileName);
//         if (!System.IO.File.Exists(imageFilePath)) {
//             return NotFound();
//         }
//         var fileStream =
//             new FileStream(imageFilePath, FileMode.Open, FileAccess.Read, FileShare.Read);
//         var contentType = _imageService.GetContentType(fileName);
//         return new FileStreamResult(fileStream, contentType);
//     }
// }
