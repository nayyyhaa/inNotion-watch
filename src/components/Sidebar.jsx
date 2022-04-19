import { NavLink } from "react-router-dom";
import { sidebarData } from "toolkit/data/sidebarData";
import { useSidebar } from "contexts/SidebarContext";

export const Sidebar = () => {
  const { showFilterBar, setShowFilterBar } = useSidebar();
  return (
    <div className={`side-bar video-sidebar w-20p ${showFilterBar ? "show-filter" : ""}`}>
      <ul className="sidebar-items no-bullet col-flex flex-start no-wrap p-h-2 m-v-3">
        {sidebarData?.map(({ _id, title, link, icon: Icon }) => {
          return (
            <NavLink
              to={link}
              key={_id}
              className={({ isActive }) => `filter-list cursor p-l-2 p-1 full-wd ${isActive ? "active-sidebar" : ""}`}
              onClick={() => setShowFilterBar(false)}
            >
              <Icon />
              <span className="sidebar-title p-l-1">{title}</span>
            </NavLink>
          );
        })}
      </ul>
    </div>
  );
};
