using FluentValidation;

namespace PatitasACasa.Application.Blogs.Commands.DeleteBlog;

public class DeleteBlogCommandValidator : AbstractValidator<DeleteBlogCommand>
{
    public DeleteBlogCommandValidator() { }
}
