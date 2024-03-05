import React from "react";
import "../../styles/HomePage.css";
import { useRecentChanges } from "../../components/Books";
import { SimplifiedChangeData } from "../../components/elements";

export const HomePage: React.FC = () => {
    const changesQuery = useRecentChanges(10);
    console.log("Data from useRecentChanges:", changesQuery.data);

    if (changesQuery.isLoading) {
        return <h1>Loading...</h1>;
    }

    const changes: SimplifiedChangeData[] | undefined = changesQuery.data;
    return (
        <div>
            <h1>Recent Updates in Library</h1>
            <ul>
                {changes?.map((change) => (
                    <a href={`/book${change.book?.key}`} key={`${change.type}-${change.bookId}-${change.timestamp}`}>
                        <li>
                            <div className="item">
                                <img
                                    src={change.book?.covers ? `http://covers.openlibrary.org/b/id/${change.book?.covers[0]}-S.jpg` : "https://openlibrary.org/images/icons/avatar_book-sm.png"}
                                    alt={change.book?.title}
                                />
                                <div>
                                    {change.type} {change.book?.title ?? "Unknown Title"}{" "}
                                    {`(${new Date(change.timestamp).toLocaleString()})`}
                                    <br />
                                    <span>Auteur: {change.book?.by_statement}</span>
                                </div>
                            </div>
                        </li>
                    </a>
                ))}

            </ul>
        </div>
    );
};

export default HomePage;
