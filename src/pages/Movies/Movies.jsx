import { useEffect, useReducer, useRef, useMemo } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import getMovies from 'controllers/api-controller';
import PaginationControls from 'components/PaginationControls';
import SplashScreen from 'components/SplashScreen';

const INITIAL_STATE = {
  data: [],
  total_pages: 1,
  isLoading: false,
  // query: '',
  // error: false,
};

const MAX_PAGES = 1000;
const PAGINATION_RELATED_ERROR = 22;

export default function Home() {
  const skipFetch = useRef(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const location = useLocation();
  const ENDPOINT = 'search/movie';

  const currentPage = useMemo(() => {
    if (searchParams.get('page') === null) {
      return 1;
    }
    const page = Number(searchParams.get('page'));
    if (isNaN(page) || page < 1 || page > MAX_PAGES) {
      skipFetch.current = true;
      return 1;
    }
    return page;
  }, [searchParams]);

  const currentQuery = useMemo(() => {
    const query = searchParams.get('query');
    if (query === null || query === '') {
      skipFetch.current = true;
      return '';
    }
    return query;
  }, [searchParams]);

  const handlePagination = page => {
    setSearchParams({ query: currentQuery, page });
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
      setSearchParams({ });
      // setSearchParams({ query: currentQuery });

      return;
    }

    dispatch({ type: 'status/loading', payload: true });
    // dispatch({ type: 'error/set', payload: false });
    getMovies(ENDPOINT, { query: currentQuery, page: currentPage })
      .then(({ results, total_pages }) => {
        if (currentPage > total_pages) {
          setSearchParams({ query: currentQuery });
        } else {
          dispatch({ type: 'data/set', payload: { results, total_pages } });
        }
      })
      .catch(error => {
        if (error.response.data.status_code === PAGINATION_RELATED_ERROR) {
          setSearchParams({ query: currentQuery });
        }
        // dispatch({ type: 'error/set', payload: true });
        Notify.info(`${error.response.data.status_message}`);
      })
      .finally(() => {
        dispatch({ type: 'status/loading', payload: false });
      });
  }, [currentPage, currentQuery, setSearchParams]);

  const handleSubmit = e => {
    const query = e.target.elements.query.value;
    e.preventDefault();
    if (isQueryValid(query)) {
      setSearchParams({ query });
      return;
    }
    Notify.failure('Enter valid query');
  };

  const isQueryValid = query => {
    return query.trim() !== '' ? true : false;
  };

  return (
    <>
      <h1>Search Movies</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter movie name{' '}
          <input
            type="text"
            name="query"
            defaultValue={currentQuery}
            // onChange={handleChangeQuery}
          />
        </label>
        <button type="submit">Search</button>
      </form>
      {state.total_pages > 1 && (
        <PaginationControls
          current={currentPage}
          total={state.total_pages}
          onClick={handlePagination}
        />
      )}
      {state.isLoading ? (
        <SplashScreen />
      ) : (
        <ul>
          {state.data.map(movie => (
            <li key={movie.id}>
              <Link to={`${movie.id}`} state={{ from: location }}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
