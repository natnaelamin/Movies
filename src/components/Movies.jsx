import React from 'react';
import { motion } from 'framer-motion';

const Movies = ({ movies, onMovieClick }) => {
  const handleMovieClick = (movie) => {
    onMovieClick(movie);
  };

  return movies.map((movie) => (
    <motion.div
      className="text-white rounded-md relative h-full"
      key={movie.id}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={() => handleMovieClick(movie)}
    >
      <img className="w-full h-full object-cover" src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
      <h2 className="absolute left-4 bottom-0 text-base text-shadow">{movie.title}</h2>
    </motion.div>
  ));
};

export default Movies;
