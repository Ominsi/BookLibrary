using BookLibrary.Models;
using BookLibrary.Data;
using Microsoft.EntityFrameworkCore;

namespace BookLibrary.Services;

public class BookService
{

    private readonly BookContext _context;

    public BookService(BookContext context)
    {
        _context = context;
    }

    public IEnumerable<Book> GetAll()
    {
        return _context.Books.Include(b => b.Author).Include(b => b.Genre).AsNoTracking().ToList();
    }

    public Book? GetByIsbn(string isbn)
    {
        return _context.Books.Include(b => b.Author).Include(b => b.Genre).AsNoTracking().SingleOrDefault(b => b.Isbn == isbn);
    }

    public IEnumerable<Book> GetByAuthor(string lName, string fName)
    {
        if (fName != "")
        {
            return _context.Books.Include(b => b.Author).Include(b => b.Genre).AsNoTracking().Where(b => b.Author!.FirstName == fName && b.Author.LastName == lName).ToList();
        }
        else
        {
            return _context.Books.Include(b => b.Author).Include(b => b.Genre).AsNoTracking().Where(b => b.Author!.LastName == lName).ToList();

        }
    }

    public Book? Create(Book newBook)
    {
        _context.Books.Add(newBook);
        _context.SaveChanges();
        
        return newBook;
    }

    public void UpdateBook(string isbn, Book book)
    {
        var bookToUpdate = _context.Books.Find(isbn);

        if (bookToUpdate is null)
        {
            throw new InvalidOperationException("Book does not exist");
        }

        bookToUpdate.Title = book.Title;
        bookToUpdate.Author = book.Author;
        bookToUpdate.Genre = book.Genre;

        _context.SaveChanges();
    }

    public void DeleteByIsbn(string isbn)
    {
        var bookToDelete = _context.Books.Find(isbn);
        if(bookToDelete is not null)
        {
            _context.Books.Remove(bookToDelete);
            _context.SaveChanges();
        }
    }
}