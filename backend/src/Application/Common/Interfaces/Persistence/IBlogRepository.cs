using PatitasACasa.Domain.Blog;

namespace PatitasACasa.Application.Common.Interfaces.Persistence;

public interface IBlogRepository
{
    Task CreateBlog(Blog blog);
    Task UpdateBlog(Blog blog);
    Task<Blog?> GetBlogById(Guid id);
    Task<Blog?> GetBlogByTags(IEnumerable<string> tags);
    Task<IEnumerable<Blog>?> GetBlogsByTags(IEnumerable<string> tags);
    Task<IEnumerable<Blog>?> GetBlogs(int pageNumber, int pageSize);
    Task DeleteBlog(Blog blog);
}
