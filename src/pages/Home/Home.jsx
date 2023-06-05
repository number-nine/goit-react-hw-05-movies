import { useEffect, useReducer, useRef, useMemo } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import getMovies from 'controllers/api-controller';
import PaginationControls from 'components/PaginationControls';
import SplashScreen from 'components/SplashScreen';

import css from './Home.module.css';

const INITIAL_STATE = {
  data: [],
  total_pages: 1,
  isLoading: false,
  // error: false,
};
const MAX_PAGES = 1000;
const PAGINATION_RELATED_ERROR = 22;

export default function Home() {
  const skipFetch = useRef(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const location = useLocation();
  const ENDPOINT = 'trending/movie/day';

  const currentPage = useMemo(() => {
    const page = Number(searchParams.get('page'));
    if (searchParams.get('page') === null) {
      return 1;
    }
    if (isNaN(page) || page < 1 || page > MAX_PAGES) {
      skipFetch.current = true;
      return 1;
    }
    return page;
  }, [searchParams]);

  const handlePagination = page => {
    setSearchParams({ page });
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'data/total':
        return {
          ...state,
          total_pages: action.payload,
        };
      case 'data/set':
        return {
          ...state,
          total_pages: action.payload.total_pages,
          data: action.payload.results,
        };
      // case 'page/reset':
      //   setSearchParams({});
      //   return state;
      // case 'error/set':
      //   return { ...state, error: action.payload };
      case 'status/loading':
        return {
          ...state,
          isLoading: action.payload,
        };

      default:
        return state;
    }
  }

  useEffect(() => {
    if (skipFetch.current) {
      skipFetch.current = false;
      setSearchParams({});

      return;
    }

    dispatch({ type: 'status/loading', payload: true });
    // dispatch({ type: 'error/set', payload: false });
    getMovies(ENDPOINT, { page: currentPage })
      .then(({ results, total_pages }) => {
        // console.log(results);
        dispatch({ type: 'data/set', payload: { results, total_pages } });
      })
      .catch(error => {
        if (error.response.data.status_code === PAGINATION_RELATED_ERROR) {
          setSearchParams({});
        }
        // dispatch({ type: 'error/set', payload: true });
        Notify.info(`${error.response.data.status_message}`);
      })
      .finally(() => {
        dispatch({ type: 'status/loading', payload: false });
      });
  }, [currentPage, setSearchParams]);

  return (
    <>
      <PaginationControls
        current={currentPage}
        total={state.total_pages}
        onClick={handlePagination}
      />
      {state.isLoading ? (
        <SplashScreen />
      ) : state.data.length > 0 ? (
        <ul className={css.Home}>
          {state.data.map(movie => (
            <li key={movie.id}>
              <Link to={`movies/${movie.id}`} state={{ from: location }}>
                <img
                  src={
                    'https://image.tmdb.org/t/p/w220_and_h330_face' +
                    movie.poster_path
                  }
                  alt={movie.title}
                />
                <h2>{movie.title}</h2>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies to display</p>
      )}
    </>
  );
}
