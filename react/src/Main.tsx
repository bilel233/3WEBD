import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Routes from "./routes/Routes";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import store, { persistor } from "./store";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
