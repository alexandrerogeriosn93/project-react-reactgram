import {
  BsFillCameraFill,
  BsFillPersonFill,
  BsHouseDoorFill,
  BsSearch,
} from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  return (
    <nav id="nav">
      <Link to="/">ReactGram</Link>
      <form>
        <BsSearch />
        <input type="text" name="search" id="search" />
      </form>
      <ul id="nav-links">
        <NavLink to="/">
          <BsHouseDoorFill />
        </NavLink>
        <NavLink to="/login">Entrar</NavLink>
        <NavLink to="/register">Registrar</NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
