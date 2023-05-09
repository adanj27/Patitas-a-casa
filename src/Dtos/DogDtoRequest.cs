namespace backendtest.Dtos;

using System.ComponentModel.DataAnnotations;

public class DogDtoRequest {
    [Required]
    public required string Name { get; set; }
    [Required]
    public required string Description { get; set; }
    [Required]
    public required string Address { get; set; }
    [Required]
    public required string Size { get; set; }
    [Required]
    public required IFormFile Image { get; set; }
    [Required]
    [Phone]
    [DataType(DataType.PhoneNumber)]
    public required string Contact { get; set; }
    [Required]
    [DataType(DataType.Date)]
    public required string Date { get; set; }
}
