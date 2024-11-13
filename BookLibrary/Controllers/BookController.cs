using BookLibrary.Data;
using BookLibrary.Migrations;
using BookLibrary.Models;
using BookLibrary.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookLibrary.Controllers;

[ApiController]
[Route("[controller]")]
public class BookController : ControllerBase
{
    BookService _service;

    public BookController(BookService service) 
    {
        _service = service;
    }

    [HttpGet]
    public IEnumerable<Book> GetAll()
    {
        return _service.GetAll();
    }

    [HttpGet("{isbn}")]
    public ActionResult<Book> GetByIsbn(string isbn)
    {
        var book = _service.GetByIsbn(isbn);

        if(book is not null)
        {
            return book;
        }
        else
        {
            return NotFound();
        }
    }

    [HttpGet("Author")]
    public IEnumerable<Book> GetByAuthor([FromQuery] string lName, [FromQuery] string fName="")
    {
        return _service.GetByAuthor(lName, fName);
    }

    [HttpPost]
    public IActionResult Create(Book newBook)
    {
        var book = _service.Create(newBook);
        return CreatedAtAction(nameof(GetByIsbn), new { Isbn = book!.Isbn}, book);
    }
    
    [HttpPut("{isbn}")]
    public IActionResult EditBook(string isbn, Book newBook)
    {
        if(isbn != newBook.Isbn)
        {
            return BadRequest();
        }

        var bookToUpdate = _service.GetByIsbn(isbn);

        if(bookToUpdate is not null)
        {
            _service.UpdateBook(isbn, newBook);
            return NoContent();
        }
        else
        {
            return NotFound();
        }
    }

    [HttpDelete("{isbn}")]
    public IActionResult Delete(string isbn)
    {
        var book = _service.GetByIsbn(isbn);

        if (book is not null)
        {
            _service.DeleteByIsbn(isbn);
            return NoContent();
        }

        else
        {
            return NotFound();
        }
    }
}