import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const App = () =>
{
  const [books, setBooks] = useState([]);

  useEffect(() => async() => {
    fetch("https://localhost:7009/Book", {
      method: "GET",
  })
    .then(async (response) => await response.json())
    .then((data) => {
      setBooks(data);
      console.log(data);
    })
    .catch((error) => console.log(error));
  }, []);

  return (
      <div>
        <h1>Book Library</h1>
        <AllBooks value= { books }></AllBooks>
      </div>
  )
}

const NewBookForm = ({editing}) =>
{

  const AddBook = async (e) =>
  {
    e.preventDefault();

    const formData = new FormData(e.target);
    
    let newBook = 
    {
      isbn: formData.get('isbn'),
      title: formData.get('title'),
      author: {
        firstName: formData.get('fName'),
        lastName: formData.get('lName')
      },
      genre: {
        name: formData.get('genre')
      }
    }

    await fetch("https://localhost:7009/Book", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook)
    })
    .then((res) => console.log(res.json()))
    .then(window.location.reload())
    .catch((err) => console.error(err))
  }
  if(editing)
  {
    return null
  }
  else 
  {
    return (
      <div>
        <h2>Add Book</h2>
        <form onSubmit={ AddBook }>
          <label htmlFor="isbn">ISBN: </label>
          <input 
            type="text" 
            id="isbn" 
            name="isbn">
          </input>      
          <label htmlFor="title">&#9; Title: </label>
          <input type="Title" 
            id="title" 
            name="title">
          </input><br></br>
          
          <label htmlFor="fName">First Name: </label>
          <input type="text" 
            id="fName" 
            name="fName">
          </input>
          
          <label htmlFor="lName">&#9; Last Name: </label>
          <input type="text" 
            id="lName" 
            name="lName">
          </input><br></br>
          
          <label htmlFor="genre"> Genre:</label>
          <input type="text" 
            id="genre" 
            name="genre">
          </input>&#9; 

          <input type="submit" 
            value="Add Book">
          </input>

        </form>
      </div>
    )
  }
}

NewBookForm.propTypes = {
  editing: PropTypes.bool,
};

const AllBooks = (books) =>
{
  const [editing, setEditing] = useState(false);
  const [bookIsbn, setBookIsbn] = useState("");
  const DeleteBook = (isbn) =>
  {
    console.log(isbn);
    fetch('https://localhost:7009/Book/'+ isbn, {
      method: 'delete',
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .then(window.location.reload())
    .catch(err => console.error(err))
  }

  return (
    <div>
      <table>
          <thead>
            <tr>
              <th>ISBN</th>
              <th>Title</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            { books.length === 0 ? null : books.value.map(b => {
              return (
                <tr key={b.isbn}>
                  <td>{b.isbn}</td>
                  <td>{b.title}</td>
                  <td>{b.author.firstName}</td>
                  <td>{b.author.lastName}</td>
                  <td>{b.genre.name}</td>
                  <td onClick = { () => {
                    setBookIsbn(b.isbn);
                    setEditing(true);
                  }}>EDIT</td>
                  <td onClick = { () => DeleteBook(b.isbn) }>DELETE</td>
                </tr>
            )}) }
          </tbody>
        </table>
        <NewBookForm editing={editing}></NewBookForm>
        <EditBook editing={editing} bookIsbn={bookIsbn}></EditBook>
      </div>

  );
}

const EditBook =  ({editing, bookIsbn}) =>
{
  const [book, setBook] = useState(null);

  const PutBook = async (e) =>
    {
      e.preventDefault();
  
      const formData = new FormData(e.target);
      
      let editedBook = 
      {
        isbn: formData.get('isbn'),
        title: formData.get('title'),
        author: {
          firstName: formData.get('fName'),
          lastName: formData.get('lName')
        },
        genre: {
          name: formData.get('genre')
        }
      }

      await fetch("https://localhost:7009/Book/" + bookIsbn, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedBook)
      })
      .then((res) => console.log(res.json()))
      .then(window.location.reload())
      .catch((err) => console.error(err))
    }  

    if (editing == false)
  {
    return null
  }
  else 
  {
    if(book == null)
    {
      fetch('https://localhost:7009/Book/'+ bookIsbn, {
        method: 'get',
      })
      .then(res => res.json())
      .then(res => setBook(res))
      .then(() => console.log(book))
      .catch(err => console.error(err))
    }

    else 
    return (
      <div>
        <h2>Edit Book</h2>
        <form onSubmit={ PutBook }>
          <label htmlFor="isbn">ISBN: </label>
          <input 
            type="text" 
            id="isbn" 
            name="isbn"
            defaultValue={book.isbn}>
          </input>      
          <label htmlFor="title">&#9; Title: </label>
          <input type="Title" 
            id="title" 
            name="title"
            defaultValue={book.title}>
          </input><br></br>
          
          <label htmlFor="fName">First Name: </label>
          <input type="text" 
            id="fName" 
            name="fName"
            defaultValue={book.author.firstName}>
          </input>
          
          <label htmlFor="lName">&#9; Last Name: </label>
          <input type="text" 
            id="lName" 
            name="lName"
            defaultValue={book.author.lastName}>
          </input><br></br>
          
          <label htmlFor="genre"> Genre:</label>
          <input type="text" 
            id="genre" 
            name="genre"
            defaultValue={book.genre.name}>
          </input>&#9; 

          <input type="submit" 
            value="Edit Book">
          </input>

        </form>
      </div>
    );
  }
}

EditBook.propTypes = {
  editing: PropTypes.bool,
  bookIsbn: PropTypes.string
};

export default App