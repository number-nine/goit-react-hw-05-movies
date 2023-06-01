import { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';

import getMovies from 'controllers/api-controller';
import NavigationButtons from 'components/NavigationButtons';

// state = {
//     page: 0,
//     data: [],
//     total: 0,
//     position: start-end-middle
// }

const PER_PAGE = 20;
const INITIAL_STATE = {
  page: 0,
  data: [],
  total: 103,
  position: 'start',
};

function reducer(state, action) {
  const lastPage = Math.ceil(state.total / PER_PAGE);
  switch (action.type) {
    case 'moveNext':
      return state.page < lastPage ? { ...state, page: state.page + 1 } : state;
    case 'movePrev':
      return state.page > 0 ? { ...state, page: state.page - 1 } : state;
    case 'moveLast':
      return state.page !== lastPage ? { ...state, page: lastPage } : state;
    case 'moveFirst':
      return state.page !== 0 ? { ...state, page: 0 } : state;
    case 'setControlsStatus':
      if (state.page === 0) {
        return { ...state, position: 'start' };
      }
      if (state.page === lastPage.page) {
        return { ...state, position: 'end' };
      }
      return { ...state, position: 'middle' };

    default:
      return state;
  }
}

export default function Home() {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    
    function handleClick(){}

  useEffect(() => {
    //   getMovies('trending/movie/')
    console.log(state);
  }, [state]);

  useEffect(() => {
    dispatch({ type: 'setControlsStatus' });
  }, [state.page]);

  return (
    <>
      <h1>Trending Movies</h1>
      <ul>
        <li>
          <Link to="/movies/1">Trending Movie 1</Link>
        </li>
      </ul>
          <NavigationButtons currentPage={ state.page} maxPage={lastPage} dispatch={dispatch} />
    </>
  );
}
