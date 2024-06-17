// src/api.js
import axios from 'axios';

const baseURL = 'https://backend-movie-xt4l.onrender.com'; // Replace with your backend server URL

const axiosInstance = axios.create({
  baseURL,
});

export const api = {
  get: async (url) => {
    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  post: async (url, data) => {
    try {
      const response = await axiosInstance.post(url, data);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  put: async (url, data) => {
    try {
      const response = await axiosInstance.put(url, data);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  delete: async (url) => {
    try {
      const response = await axiosInstance.delete(url);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
