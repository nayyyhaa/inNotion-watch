import { Link, useLocation } from "react-router-dom";
import { sidebarData } from "toolkit/data/sidebarData";
import { useSidebar } from "contexts/SidebarContext";

export const Sidebar = () => {
  const { showFilterBar, setShowFilterBar } = useSidebar();
  const location = useLocation();
  return (
    <div className={`side-bar video-sidebar w-20p ${showFilterBar ? "show-filter" : ""}`}>
      <ul className="sidebar-items no-bullet col-flex flex-start no-wrap p-h-2 m-v-3">
        {sidebarData?.map(({ _id, title, link, icon: Icon }) => {
          return (
            <Link
              to={link}
              key={_id}
              className={`filter-list cursor p-l-2 p-1 full-wd ${location.pathname === link ? "active-sidebar" : ""}`}
              onClick={() => setShowFilterBar(false)}
            >
              <Icon />
              <span className="sidebar-title p-l-1">{title}</span>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
