import { Link, Outlet } from "react-router-dom";
import css from './SharedLayout.module.css'

export default function SharedLayout() {
    return (
      <>
        <ul className={css.Menu}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="movies">Movies</Link>
          </li>
        </ul>
        <Outlet />
      </>
    );
}