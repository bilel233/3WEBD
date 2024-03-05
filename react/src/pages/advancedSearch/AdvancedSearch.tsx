import React, { useState, ChangeEvent, FormEvent } from "react";
import "../../styles/AdvancedSearch.css";
interface SearchParams {
  title: string;
  author: string;
  isbn: string;
}

interface Book {
  title: string;
  author_name?: string[];
  key: string;
  type?: string;
  cover_i?: number;
  last_modified_i?: number;
  bookId?: string;
}

const AdvancedSearch: React.FC = () => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    title: "",
    author: "",
    isbn: "",
  });
  const [results, setResults] = useState<Book[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const queryParts: string[] = [];
    Object.keys(searchParams).forEach((key) => {
      if (searchParams[key as keyof SearchParams]) {
        queryParts.push(
          `${key}=${encodeURIComponent(
            searchParams[key as keyof SearchParams]
          )}`
        );
      }
    });
    const queryString = queryParts.join("&");
    const response = await fetch(
      `https://openlibrary.org/search.json?${queryString}`
    );
    const data = await response.json();
    setResults(data.docs);
  };

  return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
                name="title"
                value={searchParams.title}
                onChange={handleChange}
            />
          </div>
          <div>
            <label>Author:</label>
            <input
                name="author"
                value={searchParams.author}
                onChange={handleChange}
            />
          </div>
          <div>
            <label>ISBN:</label>
            <input
                name="isbn"
                value={searchParams.isbn}
                onChange={handleChange}
            />
          </div>
          {}
          <button type="submit">Search</button>
        </form>
        <ul>
          {results.map((book) => { // Supprimez `index` d'ici
            return (
                <a href={`/book${book.key}`}>
                  <li key={`${book.type}-${book.bookId}-${book.last_modified_i}`}>
                    <div className="item">
                      <img
                          src={book.cover_i ? `http://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg` : "https://openlibrary.org/images/icons/avatar_book-sm.png"}
                          alt={book.title}
                      />
                      <div>
                        {book?.type} {book?.title ?? "Unknown Title"}{" "}
                        {`(${new Date(book?.last_modified_i ?? 0).toLocaleString()})`}

                        <br/>
                        <span>Auteur: {book.author_name}</span>
                      </div>
                    </div>
                  </li>
                </a>
            );
          })}
        </ul>

      </div>
  );
};

export default AdvancedSearch;
