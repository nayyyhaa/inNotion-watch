import { useAuth, useSearch } from "contexts";
import { useSidebar } from "contexts/SidebarContext";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const { setShowFilterBar } = useSidebar();
  const location = useLocation();
  const { auth } = useAuth();
  const isSidebarVisible = !(location.pathname.includes("login") || location.pathname.includes("signup"));
  const { searchIp, setSearchIp } = useSearch();

  return (
    <header className="header fixed-header">
      <nav className="navbar row-flex w-95p m-auto p-05">
        {isSidebarVisible && (
          <div
            className="hamburger icon-toggle icon-btn rd-bdr grid-ctr wt-text m-l-3"
            onClick={() => setShowFilterBar((prev) => !prev)}
          >
            <i className="fa fa-bars" aria-hidden="true"></i>
          </div>
        )}
        <Link className="m-l-3" to="/">
          <h3 className="logo">
            in.notion <span className="text-shd">watch</span>
          </h3>
        </Link>
        <label className="field searchfield w-30p" htmlFor="search-text">
          <span className="search-icon cursor p-h-1">
            <i className="fa fa-search" aria-hidden="true"></i>
          </span>
          <input
            type="search"
            className="input search-nav reset-ip p-05"
            placeholder="Search here"
            id="search-text"
            value={searchIp}
            onChange={(e) => setSearchIp(e.target.value)}
          />
          <Link to="/">
            <button className="btn secondary-outline-btn m-l-1">Search</button>
          </Link>
        </label>
        <div className="nav-icon-btns row-flex no-wrap">
          <ul className="row-flex no-bullet m-r-3">
            <li className="nav-icon-btn icon-btn rd-bdr grid-ctr wt-text">
              <Link to={auth.isAuth ? `/profile` : `/login`} className="grid-ctr">
                <i className="fa fa-user" aria-hidden="true"></i>
                <span className="nav-icon-text h6 cursor wt-text">Profile</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
