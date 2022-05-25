import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setShowFilterBar } from "redux/reducers/sidebarSlice";
import { sidebarData } from "toolkit/data/sidebarData";

export const Sidebar = () => {
  const { showFilterBar } = useSelector(store => store.sidebarReducer);
  const dispatch = useDispatch();

  return (
    <div className={`side-bar video-sidebar w-20p ${showFilterBar ? "show-filter" : ""}`}>
      <ul className="sidebar-items no-bullet col-flex flex-start no-wrap p-h-2 m-v-3">
        {sidebarData?.map(({ _id, title, link, icon: Icon }) => {
          return (
            <NavLink
              to={link}
              key={_id}
              className={({ isActive }) => `filter-list cursor p-l-2 p-1 full-wd ${isActive ? "active-sidebar" : ""}`}
              onClick={() => dispatch(setShowFilterBar('close'))}
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
