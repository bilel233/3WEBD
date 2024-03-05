import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../index.css";

import Header from "./Header";
import Footer from "./Footer";

import HomePage from "../pages/homePage/HomePage.tsx";
import AdvancedSearch from "../pages/advancedSearch/AdvancedSearch";
import BookDetail from "../pages/bookDetail/BookDetail.tsx";
import QuickSearch from "../pages/quickSearch/QuickSearch.tsx";
import ListPage from "../pages/listPage/ListPage.tsx";

const CustomRoutes = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/AdvancedSearch" element={<AdvancedSearch />} />
          <Route path="/QuickSearch" element={<QuickSearch />} />
          <Route path="/book/:categorie/:id" element={<BookDetail />} />
          <Route path="/ListPage" element={<ListPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default CustomRoutes;
