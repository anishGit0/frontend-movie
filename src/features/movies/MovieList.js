import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, deleteMovie, updateMovie } from './moviesSlice'; // Import updateMovie
import { TrashIcon } from '@heroicons/react/solid';
import { PencilIcon } from '@heroicons/react/outline';
import { api } from '../../api'; // Adjust the path as necessary

const MovieList = ({ onEdit }) => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const movieStatus = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);

  useEffect(() => {
    if (movieStatus === 'idle') {
      dispatch(fetchMovies());
    }
  }, [movieStatus, dispatch]);

  const handleUpdateMovie = async (updatedMovie) => {
    try {
      const { _id, title, director, genre, year } = updatedMovie;
      await dispatch(updateMovie({ id: _id, title, director, genre, year }));
      console.log('Movie updated successfully');
    } catch (error) {
      console.error('Failed to update movie:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/movies/${id}`);
      dispatch(deleteMovie(id));
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Movie List</h2>
      {movieStatus === 'loading' && <div>Loading...</div>}
      {movieStatus === 'failed' && <div>{error}</div>}
      {movieStatus === 'succeeded' && (
        <ul>
          {movies.map((movie) => (
            <li key={movie._id} className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded-lg">
              <span>{movie.title} - {movie.director}</span>
              <div>
                <button onClick={() => onEdit(movie)} className="text-blue-500 mr-2"><PencilIcon className="h-5 w-5" /></button>
                <button onClick={() => handleDelete(movie._id)} className="text-red-500"><TrashIcon className="h-5 w-5" /></button>
                <button onClick={() => handleUpdateMovie(movie._id, { ...movie, title: 'Updated Title' })}>Update</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieList;
