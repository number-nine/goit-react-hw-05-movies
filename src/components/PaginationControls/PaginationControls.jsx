export default function PaginationControls({ current, total, onClick }) {
  const atStart = current === 0;
  const atEnd = current === total;


  return (
    <>
      
          <button type="button" onClick={() => onClick({ type: 'first' })}>
            First Page
          </button>
          <button type="button" onClick={() => onClick({ type: 'back' })}>
            Prev page
          </button>
    
          <button type="button" onClick={() => onClick({ type: 'next' })}>
            Next page
          </button>
      <button type="button" onClick={() => onClick({ type: 'last' })} {(true && 'disabled')}>
            Last Page
          </button>
       
    </>
  );
}
