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
      <form id="search-form">
        <BsSearch />
        <input type="text" name="search" id="search" placeholder="Pesquisar" />
      </form>
      <ul id="nav-links">
        <li>
          <NavLink to="/">
            <BsHouseDoorFill />
          </NavLink>
        </li>
        <li>
          <NavLink to="/login">Entrar</NavLink>
        </li>
        <li>
          <NavLink to="/register">Registrar</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
