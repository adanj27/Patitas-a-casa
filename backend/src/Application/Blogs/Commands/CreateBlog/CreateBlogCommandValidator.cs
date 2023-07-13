using FluentValidation;

namespace PatitasACasa.Application.Blogs.Commands.CreateBlog;

public class CreateBlogCommandValidator : AbstractValidator<CreateBlogCommand>
{
    public CreateBlogCommandValidator() { }
}
