using PatitasACasa.Application.Card.Queries.GenerateCard;

namespace PatitasACasa.Application.Common.Interfaces.Services;

public interface ICardGenerator
{
    Stream Generate(CardQuery card);
}
