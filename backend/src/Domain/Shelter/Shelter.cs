// using PatitasACasa.Domain.Common.Models;
// using PatitasACasa.Domain.Shelter.ValueObjects;
// using PatitasACasa.Domain.Pet;

using PatitasACasa.Domain.Common.Models;
using PatitasACasa.Domain.Shelter.ValueObjects;
using PatitasACasa.Domain.Pet;

public sealed class Shelter : Entity<ShelterId>
{
    public string Name { get; }
    public IEnumerable<Pet> Pets { get; }

#pragma warning disable CS8618
    private Shelter() { }
#pragma warning restore CS8618
    private Shelter(ShelterId id, string name, IEnumerable<Pet> pets)
        : base(id)
    {
        Name = name;
        Pets = pets;
    }

    public static Shelter Create(string name, IEnumerable<Pet> pets)
    {
        return new(ShelterId.CreateUnique(), name, pets);
    }
}
