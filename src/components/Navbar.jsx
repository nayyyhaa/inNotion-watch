import { useSidebar } from "contexts/SidebarContext";

export const Navbar = () => {
  const { setShowFilterBar } = useSidebar();
  return (
    <>
      <header className="header fixed-header">
        <nav className="navbar row-flex w-95p m-auto p-05">
          <div
            className="hamburger icon-toggle icon-btn rd-bdr grid-ctr wt-text m-l-3"
            onClick={() => setShowFilterBar((prev) => !prev)}
          >
            <i className="fa fa-bars" aria-hidden="true"></i>
          </div>
          <a className="m-l-3" href="/">
            <h3 className="logo">
              in.notion <span className="text-shd">watch</span>
            </h3>
          </a>
          <label className="field searchfield w-30p" htmlFor="search-text">
            <span className="search-icon cursor p-h-1">
              <i className="fa fa-search" aria-hidden="true"></i>
            </span>
            <input
              type="search"
              className="input search-nav reset-ip p-05"
              placeholder="Search here"
              id="search-text"
            />
          </label>
          <div className="nav-icon-btns row-flex no-wrap">
            <ul className="row-flex no-bullet m-r-3">
              <li className="nav-icon-btn icon-btn rd-bdr grid-ctr wt-text">
                <a href="/" className="grid-ctr">
                  <i className="fa fa-user" aria-hidden="true"></i>
                  <span className="nav-icon-text h6 cursor wt-text">Profile</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};
