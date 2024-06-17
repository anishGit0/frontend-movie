import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addMovie, updateMovie } from './moviesSlice';

const AddMovie = ({ currentMovie, clearCurrentMovie }) => {
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');

  const dispatch = useDispatch();

  const clearForm = useCallback(() => {
    setTitle('');
    setDirector('');
    setGenre('');
    setYear('');
    clearCurrentMovie();
  }, [clearCurrentMovie]);

  useEffect(() => {
    if (currentMovie) {
      setTitle(currentMovie.title);
      setDirector(currentMovie.director);
      setGenre(currentMovie.genre);
      setYear(currentMovie.year);
    } else {
      clearForm();
    }
  }, [currentMovie, clearForm]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentMovie) {
      dispatch(updateMovie({ id: currentMovie._id, movie: { title, director, genre, year } }));
    } else {
      dispatch(addMovie({ title, director, genre, year }));
    }

    clearForm();
  };

  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold mb-4">{currentMovie ? 'Edit Movie' : 'Add Movie'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          placeholder="Director"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          className="block w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="block w-full p-2 mb-2 border rounded"
        />
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="block w-full p-2 mb-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {currentMovie ? 'Update' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
