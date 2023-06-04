export default function PaginationControls({ current, total, onClick }) {
  const atStart = current === 1;
  const atEnd = current === total;


  return (
    <>
      <button
        type="button"
        onClick={() => onClick(1)}
        disabled={atStart}
      >
        First Page
      </button>
      <button
        type="button"
        onClick={() => onClick(current-1)}
        disabled={atStart}
      >
        Prev page
      </button>
      Page {current} of {total}
      <button
        type="button"
        onClick={() => onClick(current+1)}
        disabled={atEnd}
      >
        Next page
      </button>
      <button
        type="button"
        onClick={() => onClick(total)}
        disabled={atEnd}
      >
        Last Page
      </button>
    </>
  );
}
