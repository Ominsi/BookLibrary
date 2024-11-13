using Microsoft.EntityFrameworkCore;
using BookLibrary.Models;

namespace BookLibrary.Data;

public class BookContext : DbContext
{

    public BookContext(DbContextOptions<BookContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Book>()
            .HasKey(b => b.Isbn);

        modelBuilder.Entity<Book>()
            .Property(b => b.Isbn).HasMaxLength(13);

        modelBuilder.Entity<Book>()    
            .Property(b => b.Title).IsRequired();

        modelBuilder.Entity<Author>()
            .Property(a => a.LastName).IsRequired();

        modelBuilder.Entity<Genre>()
            .Property(g => g.Name).IsRequired();
    } 

    public DbSet<Book> Books => Set<Book>();

    public DbSet<Author> Authors => Set<Author>();

    public DbSet<Genre> Genres => Set<Genre>();
}