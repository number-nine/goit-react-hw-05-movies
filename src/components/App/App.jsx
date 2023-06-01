import SharedLayout from 'components/SharedLayout';
import MovieDetails from 'pages/MovieDetails';
import Movies from 'pages/Movies';
import Home from 'pages/Home';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    // <div className={css.App}>
    //   <Searchbar onSubmit={handleQuery} />
    //   <ImageGallery query={query} />
    // </div>

    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<div>Cast</div>} />
            <Route path="reviews" element={<div>Reviews</div>} />
          </Route>
          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
