import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import getMovies from 'controllers/api-controller';
import SplashScreen from 'components/SplashScreen';

import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const ENDPOINT = 'movie/' + movieId + '/reviews';

  useEffect(() => {
    setIsLoading(true);
    getMovies(ENDPOINT)
      .then(({ results }) => {
        setMovieReviews(results);
        // console.log(results);
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
      {isLoading ? (
        <SplashScreen />
      ) : movieReviews?.length > 0 ? (
        <ul className={css.Reviews}>
          {movieReviews.map(({ id, author, content }) => (
            <li key={id}>
              <p className={css.author}>Author: {author}</p>
              <p>{content }</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews received</p>
      )}
    </>
  );
}
