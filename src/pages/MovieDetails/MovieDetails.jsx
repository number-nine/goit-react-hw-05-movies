import { useEffect, useState, useRef, Suspense } from 'react';
import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import getMovies from 'controllers/api-controller';
import SplashScreen from 'components/SplashScreen';

import css from './MovieDetails.module.css';

export default function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? '/movies');
  const ENDPOINT = 'movie/' + movieId;

  useEffect(() => {
    setIsLoading(true);
    getMovies(ENDPOINT)
      .then(data => {
        setMovie(data);
        // console.log(data);
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
      <Link to={backLink.current}>Back to movies</Link>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <section className={css.movieInfo}>
          <img
            className={css.moviePoster}
            src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.backdrop_path}`}
            alt={movie.title}
          />
          <h1 className={css.movieTitle}>{movie.title}</h1>
          <p className={css.movieOverview}>{movie.overview}</p>
          <p className={css.movieRating}>Rating: {movie.vote_average}</p>
          <p className={css.movieHomepage}>
            Homepage:{' '}
            <a
              href={movie.homepage ?? '#'}
              alt={movie.title}
              target="_blank"
              rel="noreferrer"
            >
              {movie.homepage}
            </a>
          </p>
        </section>
      )}
      <section>
        <h2>Additional information</h2>
        <ul className={css.submenu}>
          <li>
            <Link to="cast">Cast</Link>
          </li>

          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      </section>
      <Suspense fallback={<div>Loading subcomponent...</div>}>
        <Outlet />
      </Suspense>

      {isLoading && <SplashScreen />}
    </>
  );
}
