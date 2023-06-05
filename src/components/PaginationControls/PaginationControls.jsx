import css from './PaginationControls.module.css'

export default function PaginationControls({ current, total, onClick }) {
  const atStart = current === 1;
  const atEnd = current === total;


  return (
    <div className={css.Pagination}>
      <button type="button" onClick={() => onClick(1)} disabled={atStart}>
        &lt;&lt; First Page
      </button>
      <button
        type="button"
        onClick={() => onClick(current - 1)}
        disabled={atStart}
      >
        &lt; Prev page
      </button>
      <div className={css.counter}>
        Page {current} of {total}
      </div>
      <button
        type="button"
        onClick={() => onClick(current + 1)}
        disabled={atEnd}
      >
        Next page &gt;
      </button>
      <button type="button" onClick={() => onClick(total)} disabled={atEnd}>
        Last Page &gt;&gt;
      </button>
    </div>
  );
}
