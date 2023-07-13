using PatitasACasa.Application.Card.Queries.GenerateCard;
using PatitasACasa.Application.Common.Interfaces.Services;
using SkiaSharp;

namespace PatitasACasa.Infrastructure.Services;

public class CardGenerator : ICardGenerator
{
    public Stream Generate(CardQuery card)
    {
        var template = SKBitmap.Decode(Path.Combine("Assets", "template.png"));
        var surface = SKSurface.Create(new SKImageInfo(template.Width, template.Height));
        var canvas = surface.Canvas;

        canvas.DrawBitmap(template, 0, 0);

        var targetSize = 536.0f;

        var posX = (template.Width - targetSize) / 2;
        var posY = 112;
        var cornerRadius = targetSize / 2;

        var roundedRect = new SKRoundRect(
            new SKRect(posX, posY, targetSize + posX, targetSize + posY),
            cornerRadius,
            cornerRadius
        );

        var strokePaint = new SKPaint
        {
            Style = SKPaintStyle.Stroke,
            Color = SKColors.White,
            StrokeWidth = 22,
            FilterQuality = SKFilterQuality.High,
            IsAntialias = true,
            StrokeCap = SKStrokeCap.Round,
        };

        canvas.DrawRoundRect(roundedRect, strokePaint);
        canvas.Save();
        canvas.ClipRoundRect(roundedRect, SKClipOperation.Intersect, true);

        var userImage = SKBitmap.Decode(card.ImageFile.OpenReadStream());

        var scaleFactor = targetSize / Math.Min(userImage.Width, userImage.Height);

        var newWidth = userImage.Width * scaleFactor;
        var newHeight = userImage.Height * scaleFactor;

        using var scaledBitmap = userImage.Resize(
            new SKImageInfo((int)newWidth, (int)newHeight),
            SKFilterQuality.High
        );

        var cutRect = new SKRectI(
            (int)((scaledBitmap.Width - targetSize) / 2),
            (int)((scaledBitmap.Height - targetSize) / 2),
            (int)((scaledBitmap.Width + targetSize) / 2),
            (int)((scaledBitmap.Height + targetSize) / 2)
        );

        SKBitmap croppedBitmap = new SKBitmap((int)targetSize, (int)targetSize);
        scaledBitmap.ExtractSubset(croppedBitmap, cutRect);

        canvas.DrawBitmap(croppedBitmap, posX, posY);
        canvas.Restore();

        using var paintText = new SKPaint
        {
            TextSize = 64,
            Color = SKColors.White,
            Typeface = SKTypeface.FromFamilyName("Roboto", SKFontStyle.Bold),
            TextAlign = SKTextAlign.Center,
            FilterQuality = SKFilterQuality.High,
            TextScaleX = 1.02f,
            IsAntialias = true,
        };

        var text = $"Se perdió {card.Name}";
        var averageWidthText = paintText.MeasureText(text);
        var fontHeight = paintText.FontSpacing;

        var posX2 = (template.Width - averageWidthText) / 2;
        var posY2 = posY + 473;

        var paddingX = 80;
        var paddingY = 5;

        var cRadius = 25;
        using var roundedRectText = new SKRoundRect(
            new SKRect(
                posX2 - paddingX,
                posY2 - paddingY,
                averageWidthText + posX2 + paddingX,
                fontHeight + posY2 + paddingY
            ),
            cRadius,
            cRadius
        );

        var posTextX = template.Width / 2;
        var posTextY = posY2 + fontHeight - fontHeight / 4;

        using var backgroundPaint = new SKPaint
        {
            Color = SKColor.Parse("#D11317"),
            IsAntialias = true,
        };

        canvas.DrawRoundRect(roundedRectText, backgroundPaint);
        canvas.DrawText(text, posTextX, posTextY, paintText);

        var textSize = 38;
        using var generalTextPaint = new SKPaint
        {
            TextSize = textSize,
            Color = SKColor.Parse("#343A40"),
            Typeface = SKTypeface.FromFamilyName("Roboto", SKFontStyle.Bold),
            TextAlign = SKTextAlign.Center,
            IsAntialias = true,
        };

        var lists = new List<List<string>>()
        {
            new List<string> { "Tamaño: ", card.Size },
            new List<string> { "Zona: ", card.Zone },
            new List<string> { "Fecha: ", card.Date.ToString("d") },
            new List<string> { "Contacto: ", card.Contact },
        };

        var posTextX2 = posTextX;
        var posTextY2 = posY2 + (paddingY * 8) + 90 + 32;
        var distanceBetweenTexts = (int)generalTextPaint.FontSpacing;

        foreach (var list in lists)
        {
            var textWidth1 = generalTextPaint.MeasureText(list[0]);
            var textWidth2 = generalTextPaint.MeasureText(list[1]);
            generalTextPaint.Typeface = SKTypeface.FromFamilyName("Roboto", SKFontStyle.Bold);
            canvas.DrawText(list[0], posTextX2 - textWidth2 / 2, posTextY2, generalTextPaint);
            generalTextPaint.Typeface = SKTypeface.FromFamilyName("Roboto", SKFontStyle.Normal);
            canvas.DrawText(list[1], posTextX2 + textWidth1 / 2, posTextY2, generalTextPaint);
            posTextY2 += distanceBetweenTexts;
        }

        posTextY2 += distanceBetweenTexts / 3;
        generalTextPaint.Typeface = SKTypeface.FromFamilyName("Roboto", SKFontStyle.Bold);
        canvas.DrawText("Descripción:", posTextX, posTextY2, generalTextPaint);
        posTextY2 += distanceBetweenTexts / 3;

        generalTextPaint.TextSize = 28;
        generalTextPaint.Typeface = SKTypeface.FromFamilyName("Roboto", SKFontStyle.Normal);

        var wrappedLines = new List<string>();
        var line = "";
        var maxWidth = 676;

        foreach (var word in card.Description.Split(' '))
        {
            string testLine = line + word + " ";
            var width = generalTextPaint.MeasureText(testLine);
            if (width > maxWidth)
            {
                wrappedLines.Add(line);
                line = word + " ";
            }
            else
            {
                line = testLine;
            }
        }
        wrappedLines.Add(line.TrimEnd());

        foreach (var wrappedLine in wrappedLines)
        {
            posTextY2 += (int)generalTextPaint.FontSpacing;
            canvas.DrawText(wrappedLine, posTextX2, posTextY2, generalTextPaint);
        }

        var stream = surface.Snapshot().Encode(SKEncodedImageFormat.Png, 100).AsStream();

        return stream;
    }
}
