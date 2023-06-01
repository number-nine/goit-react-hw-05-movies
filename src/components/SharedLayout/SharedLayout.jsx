import { Link, Outlet } from "react-router-dom";

export default function SharedLayout() {
    return (
      <>
        <div>Shared Layout with Navigation</div>
        <ul>
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