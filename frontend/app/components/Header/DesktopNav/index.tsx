import { NavLink } from "react-router";

import * as s from "./DesktopNav.css";

export default function DesktopNav() {
  return (
    <nav className={s.container}>
      <NavLink
        className={({ isActive }) => s.link({ isActive })}
        to="/"
      >
        Home
      </NavLink>

      <NavLink
        className={({ isActive }) => s.link({ isActive })}
        to="/about"
      >
        about
      </NavLink>
    </nav>
  );
}
