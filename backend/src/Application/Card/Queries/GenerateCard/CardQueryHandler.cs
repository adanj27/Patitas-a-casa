using ErrorOr;
using MediatR;
using PatitasACasa.Application.Common.Interfaces.Services;

namespace PatitasACasa.Application.Card.Queries.GenerateCard;

public class CardQueryHandler : IRequestHandler<CardQuery, ErrorOr<Stream>>
{
    private readonly ICardGenerator _cardProvider;

    public CardQueryHandler(ICardGenerator cardProvider)
    {
        _cardProvider = cardProvider;
    }

    public async Task<ErrorOr<Stream>> Handle(
        CardQuery request,
        CancellationToken cancellationToken
    )
    {
        await Task.CompletedTask;
        return _cardProvider.Generate(request);
    }
}
