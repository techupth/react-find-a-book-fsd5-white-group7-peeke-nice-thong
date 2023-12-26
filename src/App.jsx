import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBook } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  const [inputState, setInputState] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (inputState.trim() !== "") {
        fetchData();
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [inputState]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${inputState}`
      );

      setBooks(response.data.items || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleInputChange = (e) => {
    setInputState(e.target.value);
  };

  return (
    <div className="App">
      <h1>
        <FontAwesomeIcon icon={faBook} style={{ marginRight: "0.5em" }} />
        Find a Book
      </h1>
      <FontAwesomeIcon icon={faSearch} style={{ marginRight: "0.5em" }} />
      <input
        type="text"
        value={inputState}
        onChange={handleInputChange}
        placeholder="Find a Book here !"
      />
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.volumeInfo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
