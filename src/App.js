import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MovieList from './features/movies/MovieList';
import AddMovie from './features/movies/AddMovie';
import Login from './features/auth/Login';
import './index.css';

function App() {
  const { token } = useSelector((state) => state.auth);
  const [currentMovie, setCurrentMovie] = useState(null);

  const handleEdit = (movie) => {
    setCurrentMovie(movie);
  };

  const clearCurrentMovie = () => {
    setCurrentMovie(null);
  };

  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-8">Movie Watchlist</h1>
        <Routes>
          <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
          <Route path="/" element={
            !token ? <Navigate to="/login" /> : (
              <>
                <AddMovie currentMovie={currentMovie} clearCurrentMovie={clearCurrentMovie} />
                <MovieList onEdit={handleEdit} />
              </>
            )
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
