import { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import getMovies from 'controllers/api-controller';
import SplashScreen from 'components/SplashScreen';

export default function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const ENDPOINT = 'movie/' + movieId;

  useEffect(() => {
    setIsLoading(true);
    getMovies(ENDPOINT)
      .then(data => {
        setMovie(data);
        console.log(data);
      })
      .catch(error => {
        Notify.info(
          `Remote data unavailable. ${error.message}. Please try again later.`
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [ENDPOINT]);
  return (
    <>
      <div>details of movie {movieId}</div>
      <p>{ movie.title ?? 'nothing to display' }</p>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>

        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Outlet />
      {isLoading && <SplashScreen />}
    </>
  );
}
