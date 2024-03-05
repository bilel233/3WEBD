import "../../styles/QuickSearch.css";
import {useState} from "react";

interface Book {
    key: string;
    title: string;
    author_name?: string[];
    cover_i?: number;
    type?: string;
    last_modified_i?: number;
}

const QuickSearch = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Book[]>([]);

    const handleSearch = async () => {
        if (!query) return;

        const response = await fetch(
            `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
        );
        const data = await response.json();
        setResults(data.docs);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Recherche rapide"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <button onClick={handleSearch}>Rechercher</button>
            <ul>
                {results.map((book) => (
                    <a key={book.key} href={`/book${book.key}`}>
                        <li>
                            <div className="item">
                                <img
                                    src={
                                        book.cover_i
                                            ? `http://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`
                                            : "https://openlibrary.org/images/icons/avatar_book-sm.png"
                                    }
                                    alt={book.title}
                                />
                                <div>
                                    {book.type} {book.title ?? "Unknown Title"}{" "}
                                    {`(${new Date(book.last_modified_i ?? 0).toLocaleString()})`}
                                    <br />
                                    <span>Auteur: {book.author_name?.join(", ")}</span>
                                </div>
                            </div>
                        </li>
                    </a>
                ))}
            </ul>
        </div>
    );
};

export default QuickSearch;
