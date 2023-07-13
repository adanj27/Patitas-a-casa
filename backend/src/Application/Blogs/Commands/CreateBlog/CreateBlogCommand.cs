using MediatR;
using Microsoft.AspNetCore.Http;
using PatitasACasa.Domain.Blog;

namespace PatitasACasa.Application.Blogs.Commands.CreateBlog;

public record CreateBlogCommand(
    string subtitle,
    string title,
    IFormFile content,
    IEnumerable<IFormFile> images,
    DateTime creationDate,
    IEnumerable<string> tags
) : IRequest<Blog>;
