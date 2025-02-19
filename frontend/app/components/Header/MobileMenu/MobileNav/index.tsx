import { NavLink } from "react-router";

import * as s from "./MobileNav.css";

type MobileNavProps = {
  onLinkClick?: () => void,
};

export default function MobileNav({ onLinkClick }: MobileNavProps) {
  return (
    <nav className={s.container}>
      <NavLink
        className={({ isActive }) => s.link({ isActive })}
        to="/"
        onClick={onLinkClick}
      >
        Home
      </NavLink>

      <NavLink
        className={({ isActive }) => s.link({ isActive })}
        to="/about"
        onClick={onLinkClick}
      >
        about
      </NavLink>
    </nav>
  );
}
