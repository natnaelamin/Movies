import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { MovieContext } from '../App';

const Modal = ({ movie, onClose }) => {
  const { favoriteMovies, setFavoriteMovies } = useContext(MovieContext);

  const isMovieInFavorites = favoriteMovies.some((favMovie) => favMovie.id === movie.id);

  const handleToggleFavorite = () => {
    if (isMovieInFavorites) {
      const updatedFavorites = favoriteMovies.filter((favMovie) => favMovie.id !== movie.id);
      setFavoriteMovies(updatedFavorites);
      localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
    } else {
      setFavoriteMovies((prevFavorites) => [...prevFavorites, movie]);
      localStorage.setItem('favoriteMovies', JSON.stringify([...favoriteMovies, movie]));
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <motion.div
        className="bg-slate-400 rounded-lg p-4 max-w-lg"
        initial={{ scale: 0 }}
        transition={{ duration: 0.5 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt={movie.title}
        />
        <h2 className="text-base">{movie.title}</h2>
        <p className="text-sm">{movie.overview}</p>
        <p className="text-sm">Release Date: {movie.release_date}</p>
        <p className="text-sm">Rating: {movie.vote_average}</p>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md mt-4" onClick={onClose}>
          Close
        </button>
        {isMovieInFavorites ? (
          <button className="bg-red-500 text-white px-4 py-2 rounded-md ml-4 mt-4" onClick={handleToggleFavorite}>
            Remove from Favorites
          </button>
        ) : (
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md ml-4 mt-4" onClick={handleToggleFavorite}>
            Add to Favorites
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default Modal;
