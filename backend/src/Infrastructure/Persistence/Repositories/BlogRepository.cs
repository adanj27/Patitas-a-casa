using PatitasACasa.Application.Common.Interfaces.Persistence;
using PatitasACasa.Domain.Blog;

namespace PatitasACasa.Infrastructure.Persistence.Repositories;

public class BlogRepository : IBlogRepository
{
    private readonly PatitasACasaDbContext _dbContext;

    public BlogRepository(PatitasACasaDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public Task CreateBlog(Blog blog)
    {
        throw new NotImplementedException();
    }

    public Task DeleteBlog(Blog blog)
    {
        throw new NotImplementedException();
    }

    public Task<Blog?> GetBlogById(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<Blog?> GetBlogByTags(IEnumerable<string> tags)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<Blog>?> GetBlogs(int pageNumber, int pageSize)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<Blog>?> GetBlogsByTags(IEnumerable<string> tags)
    {
        throw new NotImplementedException();
    }

    public Task UpdateBlog(Blog blog)
    {
        throw new NotImplementedException();
    }
}
