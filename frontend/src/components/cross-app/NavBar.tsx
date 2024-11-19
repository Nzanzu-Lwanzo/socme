import { NavLink } from "react-router-dom";
import { User, Settings, Plus, BellDot, CalendarRange } from "lucide-react";
import { deviceSupportsBackgroundPeriodicSync } from "../../utils/constants";

const NavBar = () => {
  return (
    <header className="main__header">
      <div className="logo"></div>
      <div className="actions">
        {deviceSupportsBackgroundPeriodicSync && (
          <NavLink to="/draft" className="header__btn">
            <CalendarRange size={20} />
          </NavLink>
        )}

        <NavLink to="/notifications" className="header__btn">
          <BellDot size={20} />
        </NavLink>
        <NavLink to="/settings" className="header__btn">
          <Settings size={20} />
        </NavLink>
        <NavLink to="/profile" className="header__btn">
          <User size={20} />
        </NavLink>
        <NavLink to="/add-post" className="header__btn">
          <Plus size={20} />
        </NavLink>
      </div>
    </header>
  );
};

export default NavBar;
