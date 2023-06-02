import SharedLayout from 'components/SharedLayout';
import MovieDetails from 'pages/MovieDetails';
import Movies from 'pages/Movies';
import Home from 'pages/Home';
import { Route, Routes } from 'react-router-dom';
import MovieCast from 'components/MovieCast';
import MovieReviews from 'components/MovieReviews';

const App = () => {
  return (

    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<MovieCast/>} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
