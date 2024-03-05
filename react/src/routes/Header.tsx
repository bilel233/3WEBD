import QuickSearch from "../pages/quickSearch/QuickSearch";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const links = [
  { link: "/", label: "Home" },
  { link: "/AdvancedSearch", label: "AdvancedSearch" },
  { link: "/ListPage", label: "ListPage" },
];

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">Library</div>
        <div className="header-bloc">
          <nav className="header-nav">
            {links.map((link, index) => (
              <Link key={index} to={link.link} className="nav-link">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="header-search">
            <QuickSearch />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
