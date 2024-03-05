import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PopupDialog from "../../components/PopupDialog";
import { getBookIndex } from "../../store/listStore";
import {RootState} from "../../store";

interface Book {
  title: string;
  author_name?: string[];
  cover_i: string;
  covers?: number[];
  key: string;
  by_statement?: string;
  notes?: { value: string };
}

const BookDetail = () => {
  const { id, categorie } = useParams<{ id: string; categorie: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [showPopup, setShowPopup] = useState(false); // État pour contrôler l'affichage du popup

  const allLists = useSelector((state: RootState) => state.list.lists);
  const alreadyAdd = useSelector((state: RootState) => state.list.alreadyAdd);
  const dispatch = useDispatch();

  console.log("UPDATED", alreadyAdd);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(
            `https://openlibrary.org/${categorie}/${id}.json`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Book data:", data); // Affichage des données récupérées dans la console
        dispatch(getBookIndex({ book: data }));
        setBook(data);
      } catch (error) {
        console.error("Error fetching book data:", error); // Affichage des erreurs dans la console
      }
    };

    if (id && id.length > 0 && categorie && categorie.length > 0) {
      fetchBook();
    }
  }, [id]);

  if (!book) return <div>Loading...</div>;

  // Fonction pour afficher le popup lorsqu'on clique sur le bouton "Add"
  const handleAddButtonClick = () => {
    setShowPopup(true);
  };

  return (
      <div>
        <img
            src={
              book?.covers
                  ? `http://covers.openlibrary.org/b/id/${book?.covers[0]}-M.jpg`
                  : "https://openlibrary.org/images/icons/avatar_book-sm.png"
            }
            alt={book.title}
        />
        <h2>{book.title}</h2>
        <p>Author: {book?.by_statement}</p>
        <span>Note : </span>
        <br />

        <span>{book?.notes?.value}</span>
        <br />
        {alreadyAdd && allLists && allLists.length > 0 ? (
            <span>dans la liste {allLists[alreadyAdd?.listIndex].title}</span>
        ) : (
            <button onClick={handleAddButtonClick}>Add</button>
        )}
        {}

        {showPopup && (
            <PopupDialog onClose={() => setShowPopup(false)} book={book} />
        )}
      </div>
  );
};

export default BookDetail;
