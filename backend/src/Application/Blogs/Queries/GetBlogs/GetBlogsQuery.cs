using MediatR;
using PatitasACasa.Domain.Blog;

namespace PatitasACasa.Application.Blogs.Commands.GetBlogById;

public record GetBlogsQuery(int PageNumber, int PageSize) : IRequest<IEnumerable<Blog>>;
