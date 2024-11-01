import { NavLink } from "react-router-dom";
import { User, Settings, Plus, BellDot } from "lucide-react";

const NavBar = () => {
  return (
    <header className="main__header">
      <div className="logo"></div>
      <div className="actions">
        <NavLink to="/settings" className="header__btn">
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
