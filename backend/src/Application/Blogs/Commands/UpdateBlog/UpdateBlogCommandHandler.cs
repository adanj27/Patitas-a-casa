using MediatR;
using PatitasACasa.Application.Common.Interfaces.Persistence;

namespace PatitasACasa.Application.Blogs.Commands.UpdateBlog;

public class UpdateBlogCommandHandler
    : IRequestHandler<UpdateBlogCommand> {

  private readonly IBlogRepository _blogRepository;

  public UpdateBlogCommandHandler(IBlogRepository blogRepository) {
    _blogRepository = blogRepository;
  }

    public Task Handle(UpdateBlogCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
