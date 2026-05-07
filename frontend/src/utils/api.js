import axios from 'axios';

const isLocal = window.location.hostname === 'localhost';

const API = axios.create({ 
  baseURL: isLocal 
    ? '/api' 
    : 'https://your-backend-api-url.com/api' // <--- Yahan BACKEND ka URL hona chahiye, frontend ka nahi!
});

// Attach token to every request if available
API.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;