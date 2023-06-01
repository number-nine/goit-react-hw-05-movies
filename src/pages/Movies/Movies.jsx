import { Link } from 'react-router-dom';

export default function Movies() {
  return (
    <>
      <form action="">
        <label>
          Enter movie name
          <input type="text" name="searchForm" />
        </label>
        <button type="submit">Search</button>
      </form>
      <Link to="/movies/1">Movie 1</Link>
    </>
  );
}
