import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import listSReducer from "./listStore";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, listSReducer);

const store = configureStore({
  reducer: {
    list: persistedReducer,
  },
});

export const persistor = persistStore(store);

export default store;


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
