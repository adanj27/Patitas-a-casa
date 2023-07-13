using PatitasACasa.Domain.Blog.ValueObjects;
using PatitasACasa.Domain.Common.Models;

namespace PatitasACasa.Domain.Blog;

public sealed class Blog : AggregateRoot<BlogId>
{
    public string Subtitle { get; }
    public string Title { get; }
    public string Content { get; }
    public IEnumerable<string> Images { get; }
    public IEnumerable<string> Tags { get; }
    public DateTime CreatedDateTime { get; }

    private Blog(
        BlogId blogId,
        string subtitle,
        string title,
        string content,
        IEnumerable<string> images,
        IEnumerable<string> tags,
        DateTime createdDateTime
    )
        : base(blogId)
    {
        Subtitle = subtitle;
        Title = title;
        Content = content;
        Images = images;
        Tags = tags;
        CreatedDateTime = createdDateTime;
    }

    public static Blog Create(
        string subtitle,
        string title,
        string content,
        IEnumerable<string> images,
        IEnumerable<string> tags
    )
    {
        return new(BlogId.CreateUnique(), subtitle, title, content, images, tags, DateTime.UtcNow);
    }
}
