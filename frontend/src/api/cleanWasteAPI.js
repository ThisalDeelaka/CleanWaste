import axios from 'axios';

const cleanWasteAPI = axios.create({
  // baseURL: 'https://cleanwaste-backend.onrender.com/api', 
  baseURL: 'http://localhost:5000/api',
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
