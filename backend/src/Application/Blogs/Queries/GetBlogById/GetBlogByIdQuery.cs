using MediatR;
using PatitasACasa.Domain.Blog;

namespace PatitasACasa.Application.Blogs.Commands.GetBlogById;

public record GetBlogByIdQuery(Guid Id) : IRequest<Blog>;
