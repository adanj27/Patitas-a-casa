using PatitasACasa.Domain.Common.Models;
using PatitasACasa.Domain.Pet.ValueObjects;
using PatitasACasa.Domain.Shelter.ValueObjects;

namespace PatitasACasa.Domain.Pet;

public sealed class Pet : AggregateRoot<PetId>
{
    public string Name { get; set; }
    public string ImageUrl { get; set; }
    public DateTimeOffset Date { get; set; }
    public string Contact { get; set; }
    public string Zone { get; set; }
    public int Age { get; set; }
    public PetSize Size { get; set; }
    public ShelterId? ShelterId { get; set; }
    public PetType Type { get; set; }
    public string Description { get; set; }

#pragma warning disable CS8618
    private Pet() { }
#pragma warning restore CS8618
    private Pet(
        PetId id,
        string name,
        string imageUrl,
        DateTimeOffset date,
        string contact,
        string zone,
        int age,
        PetSize size,
        ShelterId? shelterId,
        PetType type,
        string description
    )
        : base(id)
    {
        Name = name;
        ImageUrl = imageUrl;
        Date = date;
        Contact = contact;
        Zone = zone;
        Age = age;
        Size = size;
        ShelterId = shelterId;
        Type = type;
        Description = description;
    }

    public static Pet Create(
        string name,
        string imageUrl,
        DateTimeOffset date,
        string contact,
        string zone,
        int age,
        PetSize size,
        ShelterId? shelterId,
        PetType type,
        string description
    )
    {
        return new Pet(
            PetId.CreateUnique(),
            name,
            imageUrl,
            date,
            contact,
            zone,
            age,
            size,
            shelterId,
            type,
            description
        );
    }
}
