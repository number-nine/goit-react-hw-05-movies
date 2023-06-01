import { useEffect, useReducer, useState } from 'react';

const INITIAL_STATE = {
  position: 'start',
};

function reducer(state, action) {
  const lastPage = Math.ceil(state.total / PER_PAGE);
  switch (action.type) {
 
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

export default function NavigationButtons({ currentPage, pageCount, dispatch }) {
  // const [page, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [status, setStatus] = useState('start');

  return (
    <>
      {status !== 'start' && (
        <>
          <button type="button" onClick={() => dispatch({ type: 'moveFirst' })}>
            First Page
          </button>
          <button type="button" onClick={() => dispatch({ type: 'movePrev' })}>
            Prev page
          </button>
        </>
      )}
      {status !== 'end' && (
        <>
          <button type="button" onClick={() => dispatch({ type: 'moveNext' })}>
            Next page
          </button>
          <button type="button" onClick={() => dispatch({ type: 'moveLast' })}>
            Last Page
          </button>
        </>
      )}
    </>
  );
}
