import axios from 'axios';

const cleanWasteAPI = axios.create({
  baseURL: 'http://localhost:5000/api',  // Replace with the backend's base URL
});

cleanWasteAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default cleanWasteAPI;
