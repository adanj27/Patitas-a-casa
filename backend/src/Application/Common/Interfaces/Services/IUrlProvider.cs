namespace PatitasACasa.Application.Common.Interfaces.Services;

public interface IUrlProvider
{
    string CreateFilesystemUrl(string dir, string url);
    string CreateHttpResponseUrl(string fsUrl);
}
