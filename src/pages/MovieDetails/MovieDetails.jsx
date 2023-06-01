import { Link, Outlet } from 'react-router-dom';

export default function MovieDetails() {
  return (
    <>
      <div>details of movie</div>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>

        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
}
