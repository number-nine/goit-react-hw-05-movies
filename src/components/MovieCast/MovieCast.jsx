import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import getMovies from 'controllers/api-controller';
import SplashScreen from 'components/SplashScreen';

export default function MovieCast() {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const ENDPOINT = 'movie/' + movieId + '/credits';

  useEffect(() => {
    setIsLoading(true);
    getMovies(ENDPOINT)
      .then(data => {
        // console.log(data);
        setMovieCast(data);
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
      ) : movieCast.cast?.length > 0 ? (
        <ul>
          {movieCast.cast.map(actor => (
            <li key={actor.credit_id}>
              {actor.name} as {actor.character}
            </li>
          ))}
        </ul>
      ) : (
        <p>No data about actors</p>
      )}
    </>
  );
}
