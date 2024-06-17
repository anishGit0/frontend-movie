import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './app/store'; // Adjust this import according to your file structure
import App from './App';
import './index.css'; // Ensure your styles are loaded

// Import createRoot from react-dom/client
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
