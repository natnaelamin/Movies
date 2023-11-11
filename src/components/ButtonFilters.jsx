import React, { useContext, useState, useEffect } from 'react';
import { genres } from '../genres';
import { MovieContext } from '../App';

const ButtonFilters = () => {
  const [tabActive, setTabActive] = useState(0);
  const [showFavorites, setShowFavorites] = useState(false);
  const { popularMovies, setFilteredMovies, favoriteMovies, setFavoriteMovies } = useContext(MovieContext);

  useEffect(() => {
    try {
      const storedFavoriteMovies = localStorage.getItem('favoriteMovies');
      if (storedFavoriteMovies) {
        setFavoriteMovies(JSON.parse(storedFavoriteMovies));
      }
    } catch (error) {
      console.error('Error parsing favorite movies from local storage:', error);
    }
  }, [setFavoriteMovies]);

  useEffect(() => {
    try {
      localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
    } catch (error) {
      console.error('Error storing favorite movies in local storage:', error);
    }
  }, [favoriteMovies]);

  useEffect(() => {
    try {
      localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
      if (showFavorites) {
        setFilteredMovies(favoriteMovies);
      }
    } catch (error) {
      console.error('Error storing favorite movies in local storage:', error);
    }
  }, [favoriteMovies, setFilteredMovies, showFavorites]);

  const handleClickFilter = (id) => {
    if (id === 0) {
      setTabActive(id);
      setShowFavorites(false);
      setFilteredMovies(popularMovies);
    } else if (id === -1) {
      setTabActive(id);
      setShowFavorites(true);
      setFilteredMovies(favoriteMovies);
    } else {
      setTabActive(id);
      setShowFavorites(false);
      const filteredMovies = popularMovies.filter((movie) => movie.genre_ids.includes(id));
      setFilteredMovies(filteredMovies);
    }
  };

  return (
    <div className="flex justify-center gap-8 flex-wrap">
      {genres.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClickFilter(item.id)}
          className={`text-sm border-slate-200 h-8 border-0 px-1 w-20 rounded-md ${
            tabActive === item.id ? 'bg-black text-white' : 'bg-slate-200 text-black'
          }`}
        >
          {item.name}
        </button>
      ))}
      <button
        onClick={() => handleClickFilter(-1)}
        className={`text-sm border-slate-200 h-8 border-0 px-1 w-20 rounded-md ${
          tabActive === -1 ? 'bg-black text-white' : 'bg-slate-200 text-black'
        }`}
      >
        Favorites
      </button>
    </div>
  );
};

export default ButtonFilters;
