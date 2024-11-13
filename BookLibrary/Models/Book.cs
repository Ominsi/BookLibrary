namespace BookLibrary.Models;

public class Book
{
    public string? Isbn { get; set; }

    public string? Title { get; set; }

    public Author? Author { get; set; }

    public Genre? Genre { get; set; }
}