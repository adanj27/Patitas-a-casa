using ErrorOr;
using MediatR;

using Microsoft.AspNetCore.Http;

namespace PatitasACasa.Application.Card.Queries.GenerateCard;

public record CardQuery(
    string Name,
    string Description,
    string Zone,
    string Size,
    string Contact,
    DateOnly Date,
    IFormFile ImageFile
) : IRequest<ErrorOr<Stream>>;
