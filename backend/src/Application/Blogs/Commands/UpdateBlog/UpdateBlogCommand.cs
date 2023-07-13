using MediatR;
using Microsoft.AspNetCore.Http;

namespace PatitasACasa.Application.Blogs.Commands.UpdateBlog;

public record UpdateBlogCommand(Guid Id, string Subtitle, string Title,
                                IFormFile Content,
                                IEnumerable<IFormFile> Images,
                                DateTime CreationDate, IEnumerable<string> Tags) : IRequest;
