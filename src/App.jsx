import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [text, setText] = useState("");
  const [books, setBooks] = useState([]);

  const handleInputChange = (event) => {
    setText(event.target.value);
    console.log(text);
  };

  useEffect(() => {
    Search();
  }, [text]);

  async function Search() {
    const result = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${text}`
    );
    setBooks(result.data.items);
  }

  return (
    <div>
      <h1>Find a Book</h1>
      <input type="text" value={text} onChange={handleInputChange} />
      <div>
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <h3>{book.volumeInfo.title}</h3>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
