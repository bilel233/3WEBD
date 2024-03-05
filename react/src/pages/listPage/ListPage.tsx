import React from 'react';
import "../../styles/ListPage.css";
import { useDispatch, useSelector } from "react-redux";
import { removeBook } from "../../store/listStore";

// Définition des interfaces pour le typage
interface Book {
  key?: string;
  title?: string;
  covers?: number[];
  last_modified?: {
    value: string;
  };
  by_statement?: string;
}

interface List {
  title: string;
  data: Book[];
}

interface RootState {
  list: {
    lists: List[];
  };
}

const ListPage: React.FC = () => {
  // Utilisation de useSelector avec un typage correct
  const allLists = useSelector((state: RootState) => state.list.lists);
  const dispatch = useDispatch();

  // Fonction pour supprimer un livre d'une liste avec typage des paramètres
  const handleRemoveFromList = (listIndex: number, bookIndex: number) => {
    dispatch(removeBook({ listIndex, bookIndex }));
  };

  return (
      <div className="list-page">
        <h2>Listes de livres</h2>
        {allLists.map((list, index) => (
            <div key={index} className="list-container">
              <h3>{list.title}</h3>
              <ul>
                {list.data.map((book, idx) => (
                    <li key={idx}>
                      <a href={`/book${book.key}`}>
                        {/* Suppression du <li> redondant */}
                        <div className="item">
                          <img
                              src={
                                book.covers
                                    ? `http://covers.openlibrary.org/b/id/${book.covers[0]}-S.jpg`
                                    : "https://openlibrary.org/images/icons/avatar_book-sm.png"
                              }
                              alt={book.title}
                          />
                          <div>
                            {book.title ?? "Unknown Title"}{" "}
                            {`(${new Date(book.last_modified?.value || '').toLocaleString()})`}
                            <br />
                            <span>Auteur: {book.by_statement}</span>
                          </div>
                        </div>
                      </a>
                      <button onClick={() => handleRemoveFromList(index, idx)}>
                        Supprimer
                      </button>
                    </li>
                ))}
              </ul>
            </div>
        ))}
      </div>
  );
};

export default ListPage;
