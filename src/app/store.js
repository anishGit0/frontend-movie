import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../features/movies/moviesSlice';
import authReducer from '../features/auth/authSlice';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    auth: authReducer,
  },
});

export default store;
