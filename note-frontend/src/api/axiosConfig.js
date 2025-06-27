import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mern-note-backend-v5wx.onrender.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    // Add other common headers here if needed
  }
});

export default api;