namespace backendtest.Services;

using SkiaSharp;
using Microsoft.AspNetCore.StaticFiles;

public interface IImageService {
    Stream GetNewImage(IFormFile file, string imageUrl);
    string GetContentType(string imageUrl);
}
public class ImageService : IImageService {
    private readonly FileExtensionContentTypeProvider _contentTypeProvider;

    public ImageService(FileExtensionContentTypeProvider contentTypeProvider) {
        _contentTypeProvider = contentTypeProvider;
    }

    public Stream GetNewImage(IFormFile image, string imageUrl) {
        // using SKBitmap templateBitmap = SKBitmap.Decode("./assets/template.png");
        using SKBitmap originalBitmap = SKBitmap.Decode(image.OpenReadStream());
        SKBitmap croppedbitmap = new SKBitmap(512, 512);
        int targetWidth = 512;
        int targetHeight = 512;
        float scaleX = (float)targetWidth / originalBitmap.Width;
        float scaleY = (float)targetHeight / originalBitmap.Height;
        float scale = Math.Max(scaleX, scaleY);

        using SKBitmap scaledBitmap =
            originalBitmap.Resize(new SKImageInfo((int)(originalBitmap.Width * scale),
                                                  (int)(originalBitmap.Height * scale)),
                                  SKFilterQuality.High);
        int cropX = (scaledBitmap.Width - targetWidth) / 2;
        int cropY = (scaledBitmap.Height - targetHeight) / 2;
        SKRectI cropRect = SKRectI.Create(cropX, cropY, targetWidth, targetHeight);
        scaledBitmap.ExtractSubset(croppedbitmap, cropRect);

        var encodeCroppedBitmap = croppedbitmap.Encode(SKEncodedImageFormat.Png, 100);
        // encodeCroppedBitmap.SaveTo(File.Create("./results/" + imageUrl));
        var stream = encodeCroppedBitmap.AsStream();
        return stream;
    }
    public string GetContentType(string imageUrl) {
        string ? contentType;
        if (!_contentTypeProvider.TryGetContentType(imageUrl, out contentType)) {
            contentType = "application/octet-stream";
        }
        return contentType;
    }
}
