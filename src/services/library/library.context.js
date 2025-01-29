import { createContext, useState } from "react";

export const LibraryContext = createContext();

export const LibraryContextProvider = ({ children }) => {
  const [present, setPresent] = useState(false);
  const [visible, setVisible] = useState(false);
  const [library, setLibrary] = useState([]);

  const add = ({ book }) => {
    if (library.filter((item) => item.id === book.id).length === 0)
      setLibrary([...library, book]);
    else setPresent(true);
  };

  const remove = ({ book: { id } }) => {
    setLibrary(library.filter((item) => item.id != id));
  };

  const isPresent = ({ book: { id } }) => {
    if (library.filter((item) => item.id === id).length !== 0) return true;
  };

  return (
    <LibraryContext.Provider
      value={{
        library,
        add,
        remove,
        visible,
        setVisible,
        present,
        setPresent,
        isPresent,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};
