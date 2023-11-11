import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import ButtonFilters from './components/ButtonFilters';
import Movies from './components/Movies';
import { AnimatePresence } from 'framer-motion';
import Modal from './components/Modal';

export const MovieContext = createContext();

function App() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favoriteMovies, setFavoriteMovies] = useState(() => {
    const storedFavoriteMovies = localStorage.getItem('favoriteMovies');
    return storedFavoriteMovies ? JSON.parse(storedFavoriteMovies) : [];
  });

  const handleMovieClick = (movie, showFavorites) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);

    if (showFavorites) {
      setFilteredMovies(favoriteMovies);
    }
  };

  const fetchPopularMovies = async () => {
    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/movie/popular?api_key=981aa84c82369dcb86c3ca4bb1def220&language=en-US&page=1'
      );
      const movies = await response.json();
      setPopularMovies(movies.results);
      setFilteredMovies(movies.results);
    } catch (error) {
      console.error('Failed to fetch popular movies:', error);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  useEffect(() => {
    const storedFavoriteMovies = localStorage.getItem('favoriteMovies');
    if (storedFavoriteMovies) {
      setFavoriteMovies(JSON.parse(storedFavoriteMovies));
    } else {
      setFavoriteMovies([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
  }, [favoriteMovies]);

  const value = {
    popularMovies,
    filteredMovies,
    setFilteredMovies,
    favoriteMovies,
    setFavoriteMovies,
  };

  return (
    <MovieContext.Provider value={value}>
      <div className="text-center m-0 pt-8 pb-16 bg-slate-600 bg-cover min-h-screen">
        <h1 className="text-7xl mb-16 text-white">Top Movies</h1>
        <ButtonFilters />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 mx-16">
          <AnimatePresence>
            <Movies movies={filteredMovies} onMovieClick={handleMovieClick} />
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {isModalOpen && <Modal movie={selectedMovie} onClose={() => setIsModalOpen(false)} />}
        </AnimatePresence>
      </div>
    </MovieContext.Provider>
  );
}

export default App;
