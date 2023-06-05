import { NavLink, Outlet } from "react-router-dom";
import css from './SharedLayout.module.css'
import { Suspense } from "react";

export default function SharedLayout() {
    return (
      <>
        <ul className={css.Menu}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? css.active : css.nav_link
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="movies"
              className={({ isActive }) =>
                isActive ? css.active : css.nav_link
              }
            >
              Movies
            </NavLink>
          </li>
        </ul>
        <Suspense fallback={<div>Loading component...</div>}>
          <Outlet />
        </Suspense>
      </>
    );
}