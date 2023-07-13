using MediatR;
using PatitasACasa.Application.Common.Interfaces.Persistence;

namespace PatitasACasa.Application.Blogs.Commands.DeleteBlog;

public class DeleteBlogCommandHandler : IRequestHandler<DeleteBlogCommand>
{
    private readonly IBlogRepository _blogRepository;

    public DeleteBlogCommandHandler(IBlogRepository blogRepository)
    {
        _blogRepository = blogRepository;
    }

    public Task Handle(DeleteBlogCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
