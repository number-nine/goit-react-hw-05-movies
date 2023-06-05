import { NavLink, Outlet } from "react-router-dom";
import css from './SharedLayout.module.css'

export default function SharedLayout() {
    return (
      <>
        <ul className={css.Menu}>
          <li>
            <NavLink to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="movies">
              Movies
            </NavLink>
          </li>
        </ul>
        <Outlet />
      </>
    );
}