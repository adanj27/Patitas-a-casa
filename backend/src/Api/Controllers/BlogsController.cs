using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PatitasACasa.Application.Blogs.Commands.CreateBlog;
using PatitasACasa.Application.Blogs.Commands.DeleteBlog;
using PatitasACasa.Application.Blogs.Commands.GetBlogById;
using PatitasACasa.Application.Blogs.Commands.UpdateBlog;

namespace PatitasACasa.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BlogController : ControllerBase
{
    private readonly ISender _mediator;

    public BlogController(ISender mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("{id:guid}")]
    [AllowAnonymous]
    public IActionResult GetBlogById(GetBlogByIdQuery request)
    {
        var result = _mediator.Send(request);
        throw new NotImplementedException();
    }

    [HttpGet]
    [AllowAnonymous]
    public IActionResult GetBlogs([FromQuery] GetBlogsQuery request)
    {
        throw new NotImplementedException();
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public IActionResult CreateBlog([FromBody] CreateBlogCommand request)
    {
        throw new NotImplementedException();
    }

    [HttpPut("{id:guid}")]
    [Authorize(Roles = "Admin")]
    public IActionResult UpdateBlog([FromRoute] Guid Id, [FromBody] UpdateBlogCommand request)
    {
        throw new NotImplementedException();
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Roles = "Admin")]
    public IActionResult DeleteBlog([FromRoute] DeleteBlogCommand request)
    {
        throw new NotImplementedException();
    }
}
