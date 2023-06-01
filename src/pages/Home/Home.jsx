import { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import getMovies from 'controllers/api-controller';
import PaginationControls from 'components/PaginationControls';
import SplashScreen from 'components/SplashScreen';

const PER_PAGE = 20;
const INITIAL_STATE = {
  page: 0,
  data: [],
  total: 103,
};

export default function Home() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(false);

  const lastPage = Math.ceil(state.total / PER_PAGE);

  function reducer(state, action) {
    switch (action.type) {
      case 'next':
        return { ...state, page: state.page + 1 };
      case 'back':
        return { ...state, page: state.page - 1 };
      case 'last':
        return { ...state, page: lastPage };
      case 'first':
        return { ...state, page: 0 };

      default:
        return state;
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getMovies('trending/movie/')
      .then(data => {
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
  }, [state.page]);

  return (
    <>
      <h1>Trending Movies</h1>
      <ul>
        <li>
          <Link to="/movies/1">Trending Movie 1</Link>
        </li>
      </ul>
      <PaginationControls
        current={state.page}
        total={lastPage}
        onClick={dispatch}
      />
      {isLoading && <SplashScreen />}
    </>
  );
}
