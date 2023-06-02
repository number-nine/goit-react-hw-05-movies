import { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import getMovies from 'controllers/api-controller';
import PaginationControls from 'components/PaginationControls';
import SplashScreen from 'components/SplashScreen';

const INITIAL_STATE = {
  page: 1,
  data: [],
  total_pages:1,
};

export default function Home() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const [isLoading, setIsLoading] = useState(false);
    const ENDPOINT = 'trending/movie/day';

  function reducer(state, action) {
    switch (action.type) {
      case 'next':
        return { ...state, page: state.page + 1 };
      case 'back':
        return { ...state, page: state.page - 1 };
      case 'last':
        return { ...state, page: state.total_pages };
      case 'first':
            return { ...state, page: 1 };
        case 'setData':
            return {
              ...state,
              total_pages: action.loadout.total_pages,
              data: action.loadout.results,
            };

      default:
        return state;
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getMovies(ENDPOINT, { page: state.page })
      .then(data => {
        dispatch({ type: 'setData', loadout: data });
      })
      .catch(error => {
        Notify.info(
          `Remote data unavailable. ${error.message}. Please try again later.`
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [state.page]);

  return (
    <>
      <h1>Trending Movies</h1>
      <PaginationControls
        current={state.page}
        total={state.total_pages}
        onClick={dispatch}
      />
      <ul>
        {state.data.map(movie => (
          <li key={movie.id}>
            <Link to={`movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>

      {isLoading && <SplashScreen />}
    </>
  );
}
