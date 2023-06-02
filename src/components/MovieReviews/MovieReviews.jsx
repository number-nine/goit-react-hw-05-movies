import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import getMovies from 'controllers/api-controller';
import SplashScreen from 'components/SplashScreen';

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
        console.log(results);
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
      <div>Reviews for movie {movieId}</div>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <ul>
          {movieReviews?.map(({ id, author, content }) => (
            <li key={id}>
              {author}: {content}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
