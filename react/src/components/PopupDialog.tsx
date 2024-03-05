import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import "../styles/PopupDialog.css";
import { useDispatch, useSelector } from 'react-redux';
import { addToList, createAndAddToList } from "../store/listStore";

interface PopupProps {
  onClose: () => void;
  book: Book;
}

interface Book {
  key: string;
  title: string;
  author?: string;
  cover_i?: string;
}

interface RootState {
  list: {
    lists: List[];
  };
}

interface List {
  title: string;
}

const PopupDialog: React.FC<PopupProps> = ({ onClose, book }) => {
  const [creatingList, setCreatingList] = useState(false);
  const [listName, setListName] = useState("");
  const [selectedList, setSelectedList] = useState<string>("");

  const allLists = useSelector((state: RootState) => state.list.lists);
  const dispatch = useDispatch();

  const addToAList = (index: number) => {
    const listTitle = allLists[index].title;
    setSelectedList(listTitle);
    dispatch(addToList({ listIndex: index, book }));
    onClose();
  };

  const createListAndAdd = () => {
    setSelectedList(listName);
    dispatch(createAndAddToList({ title: listName, book }));
    onClose();
  };

  return ReactDOM.createPortal(
      <div className="popup-dialog">
        <h2>Actions</h2>
        <button onClick={() => setCreatingList(!creatingList)}>
          {creatingList ? "Annuler la création" : "Créer une nouvelle liste"}
        </button>

        {creatingList ? (
            <div>
              <input
                  type="text"
                  placeholder="Nom de la nouvelle liste"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
              />
              <button onClick={createListAndAdd}>Créer et ajouter</button>
            </div>
        ) : (
            allLists.map((list, index) => (
                <div key={index} className="list-container">
                  <h3>{list.title}</h3>
                  <button onClick={() => addToAList(index)}>Ajouter à cette liste</button>
                </div>
            ))
        )}

        {selectedList && (
            <div>
              <p>Livre ajouté à la liste : {selectedList}</p>
            </div>
        )}
      </div>,
      document.body
  );
};

export default PopupDialog;
