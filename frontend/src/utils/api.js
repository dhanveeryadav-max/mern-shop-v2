import axios from 'axios';

// Vercel proxy configuration ke baad ab humein poore URL ki zaroorat nahi hai.
// Ye local aur production dono pe apne aap sahi rasta dhund lega.
const API = axios.create({ 
  baseURL: '/api' 
});

// Har request ke saath token bhejne ke liye interceptor
API.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    try {
      const { token } = JSON.parse(userInfo);
      config.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      console.error("Token parse error:", error);
    }
  }
  return config;
});

export default API;