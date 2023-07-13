using MediatR;
using PatitasACasa.Application.Common.Interfaces.Persistence;
using PatitasACasa.Domain.Blog;

namespace PatitasACasa.Application.Blogs.Commands.CreateBlog;

public class CreateBlogCommandHandler : IRequestHandler<CreateBlogCommand, Blog>
{
    private readonly IBlogRepository _blogRepository;

    public CreateBlogCommandHandler(IBlogRepository blogRepository)
    {
        _blogRepository = blogRepository;
    }

    public Task<Blog> Handle(CreateBlogCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
