import "./sidebar.css";

import { Link ,NavLink} from "react-router-dom";
import logo from "../../images/logo.png";
export default function Sidebar() {
  return (
    <div className="sidebar">
      <img src={logo} alt="" className="logo" />

      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <ul className="sidebarList">
            <NavLink to="/"    className={({ isActive }) => (isActive ? "link-active" : "link")}>
              <li className="sidebarListItem" >
              <i class="fa-solid fa-house-user"></i>
                {/* Home */}
              </li>
            </NavLink>
            <NavLink to="/products" className="link" >
              <li className="sidebarListItem">
              <i class="fa-brands fa-product-hunt"></i>
                {/* Products */}
              </li>
            </NavLink>
            <NavLink to="/reports" className="link">
              <li className="sidebarListItem">
               <i class="fa-solid fa-magnifying-glass-chart"></i>
                {/* Reports */}
              </li>
            </NavLink>
            <NavLink to="/category" className="link">
              <li className="sidebarListItem">
              <i class="fa-solid fa-bars"></i>
                {/* Reports */}
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
}
