import { NavLink } from "react-router-dom";
import { User } from "lucide-react";

const NavBar = () => {
  return (
    <header className="main__header">
      <div className="logo"></div>
      <NavLink to="/profile" className="header__btn">
        <span>Profile</span>
        <span className="icon">
          <User size={20} />
        </span>
      </NavLink>
    </header>
  );
};

export default NavBar;
