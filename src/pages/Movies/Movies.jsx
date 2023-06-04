import { useEffect, useReducer, useRef, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
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

export default function Home() {
  const skipFetch = useRef(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
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
      setSearchParams({});

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
        if (error.response.data.status_code === 22) {
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
      // dispatch({ type: 'first' });
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
              <Link to={`${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
// import { useEffect, useReducer, useState } from 'react';
// import { Link, useSearchParams } from 'react-router-dom';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// import getMovies from 'controllers/api-controller';
// import PaginationControls from 'components/PaginationControls';
// import SplashScreen from 'components/SplashScreen';

// const INITIAL_STATE = {
//   page: 1,
//   data: [],
//   total_pages: 1,
//   query: '',
// };

// export default function Movies() {
//   const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
//   const [isLoading, setIsLoading] = useState(false);
//   const [searchParams, setSeachParams] = useSearchParams();
//   // const [query, setQuery] = useState('');
//   const ENDPOINT = 'search/movie';

//   function reducer(state, action) {
//     switch (action.type) {
//       case 'next':
//         return { ...state, page: state.page + 1 };
//       case 'back':
//         return { ...state, page: state.page - 1 };
//       case 'last':
//         return { ...state, page: state.total_pages };
//       case 'first':
//         return { ...state, page: 1 };
//       case 'setData':
//         return {
//           ...state,
//           total_pages: action.loadout.total_pages,
//           data: action.loadout.results,
//         };
//       case 'setQuery':
//         return {
//           ...state,
//           query: action.loadout,
//         };

//       default:
//         return state;
//     }
//   }

//   useEffect(() => {
//     setIsLoading(true);
//     getMovies(ENDPOINT, { page: state.page, query: searchParams.get('query') })
//       .then(data => {
//         console.log(data);
//         dispatch({ type: 'setData', loadout: data });
//       })
//       .catch(error => {
//         Notify.info(
//           `Remote data unavailable. ${error.message}. Please try again later.`
//         );
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   }, [state.page, searchParams]);

//   useEffect(() => {
//     setSeachParams({ page: state.page, query: state.query });
//   }, [state.page]);

//   const handleChangeQuery = e => {
//     const { value } = e.target;
//     dispatch({ type: 'setQuery', loadout: value });
//   };

//   const handleSubmit = e => {
//     e.preventDefault();
//     if (isQueryValid()) {
//       dispatch({ type: 'first' });
//       setSeachParams({ page: state.page, query: state.query });
//       return;
//     }
//     Notify.failure('Enter valid query');
//   };

//   const isQueryValid = () => {
//     return state.query.trim() !== '' ? true : false;
//   };

//   return (
//     <>
//       <h1>Search Movies</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Enter movie name{' '}
//           <input
//             type="text"
//             name="query"
//             value={state.query}
//             onChange={handleChangeQuery}
//           />
//         </label>
//         <button type="submit">Search</button>
//       </form>
//       {state.total_pages > 1 && (
//         <PaginationControls
//           current={state.page}
//           total={state.total_pages}
//           onClick={dispatch}
//         />
//       )}
//       {isLoading ? (
//         <SplashScreen />
//       ) : (
//         <ul>
//           {state.data.map(movie => (
//             <li key={movie.id}>
//               <Link to={`${movie.id}`}>{movie.title}</Link>
//             </li>
//           ))}
//         </ul>
//       )}
//     </>
//   );
// }
