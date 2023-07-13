using MediatR;

namespace PatitasACasa.Application.Blogs.Commands.DeleteBlog;

public record DeleteBlogCommand(Guid Id) : IRequest;
