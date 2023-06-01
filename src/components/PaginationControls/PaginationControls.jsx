export default function PaginationControls({ current, total, onClick }) {
  const atStart = current === 0;
  const atEnd = current === total;


  return (
    <>
      <button
        type="button"
        onClick={() => onClick({ type: 'first' })}
        disabled={atStart}
      >
        First Page
      </button>
      <button
        type="button"
        onClick={() => onClick({ type: 'back' })}
        disabled={atStart}
      >
        Prev page
      </button>

      <button
        type="button"
        onClick={() => onClick({ type: 'next' })}
        disabled={atEnd}
      >
        Next page
      </button>
      <button
        type="button"
        onClick={() => onClick({ type: 'last' })}
        disabled={atEnd}
      >
        Last Page
      </button>
    </>
  );
}
