import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Book {
  key: string;
  title: string;
  author?: string;
  cover_i?: string;

}

interface List {
  title: string;
  data: Book[];
}

interface ListState {
  lists: List[];
  alreadyAdd?: { bookIndex: number; listIndex: number };
}

interface AddToListPayload {
  book: Book;
  listIndex: number;
}

interface CreateAndAddToListPayload {
  book: Book;
  title: string;
}

interface RemoveBookPayload {
  listIndex: number;
  bookIndex: number;
}

// La fonction de vérification avant ajout
const checkBookBeforeAdd = (allLists: List[], book: Book): boolean => {
  return allLists.some((list) => list.data.some((item) => item.key === book.key));
};

export const listSlice = createSlice({
  name: "listSlice",
  initialState: {
    lists: [],
  } as ListState,

  reducers: {
    addToList: (state, action: PayloadAction<AddToListPayload>) => {
      const { book, listIndex } = action.payload;

      if (checkBookBeforeAdd(state.lists, book)) {
        alert("Deja ajouter");
        return;
      }

      state.lists[listIndex].data.push(book);
    },

    createAndAddToList: (state, action: PayloadAction<CreateAndAddToListPayload>) => {
      const { book, title } = action.payload;

      if (checkBookBeforeAdd(state.lists, book)) {
        alert("Deja ajouter");
        return;
      }

      state.lists.push({ title, data: [book] });
    },

    removeBook: (state, action: PayloadAction<RemoveBookPayload>) => {
      const { listIndex, bookIndex } = action.payload;
      state.lists[listIndex].data.splice(bookIndex, 1);
    },

    getBookIndex: (state, action: PayloadAction<{ book: Book }>) => {
      const { book } = action.payload;

      let listIndex = -1;
      let bookIndex = -1;

      state.lists.findIndex((list, index) => {
        const findIndex = list.data.findIndex((item) => item.key === book.key);
        if (findIndex !== -1) {
          listIndex = index;
          bookIndex = findIndex;
        }
      });

      state.alreadyAdd = bookIndex > -1 && listIndex > -1 ? { bookIndex, listIndex } : undefined;
    },
  },
});

export const { addToList, createAndAddToList, removeBook, getBookIndex } = listSlice.actions;

export default listSlice.reducer;
