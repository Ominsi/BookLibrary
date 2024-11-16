import { useEffect, useState } from "react";

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
    <Table value= {books}></Table>
  )
}

const Table = (books) =>
{
  return (
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
          {books.length === 0 ? null : books.value.map(b => <tr key={b.isbn}><td>{b.isbn}</td><td>{b.title}</td><td>{b.author.firstName}</td><td>{b.author.lastName}</td><td>{b.genre.name}</td></tr>)}
        </tbody>
      </table>
  );
}

export default App