import { createContext, useState } from "react";
import { fetch } from "expo/fetch";

export const BooksContext = createContext();

export const BooksContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);

  const search = async (page = 0, searchQuery) => {
    setLoading(true);
    const formattedQuery = searchQuery.toLowerCase().replace(/ /g, "+");
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${formattedQuery}&startIndex=${
        page * 10
      }&maxResults=10`
    )
      .then((r) => r.json())
      .then((data) => {
        setBooks((prevBooks) => [...prevBooks, ...(data.items || [])]);
        setLoading(false);
        console.log(data);
      })
      .catch((err) => {
        console.error("Error fetching data:", error);
        setError(err);
        setLoading(false);
      });
  };

  const clear = () => {
    setBooks([]);
  };

  return (
    <BooksContext.Provider value={{ loading, error, books, search, clear }}>
      {children}
    </BooksContext.Provider>
  );
};
