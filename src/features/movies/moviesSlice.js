import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { api } from '../../api'; // Assuming you have an API module

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await axios.get('https://backend-movie-xt4l.onrender.com/movies');
  return response.data;
});

export const addMovie = createAsyncThunk('movies/addMovie', async (movie) => {
  const response = await axios.post('https://backend-movie-xt4l.onrender.com/movies/add', movie);
  return response.data;
});

export const updateMovie = createAsyncThunk('movies/updateMovie', async ({ id, movie }) => {
  const response = await axios.post(`https://backend-movie-xt4l.onrender.com/movies/update/${id}`, movie);
  return response.data;
});

export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (id) => {
  await axios.delete(`https://backend-movie-xt4l.onrender.com/movies/${id}`);
  return id;
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload);
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        const updatedMovie = action.payload;
        const existingMovie = state.movies.find((movie) => movie._id === updatedMovie._id);
        if (existingMovie) {
          Object.assign(existingMovie, updatedMovie);
        }
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter((movie) => movie._id !== action.payload);
      });
  },
});

export default moviesSlice.reducer;
