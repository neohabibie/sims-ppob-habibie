import axios from 'axios';
import store from '../store';

const api = axios.create({
  // baseURL: 'take-home-test-api.nutech-integrasi.com',
  baseURL: '/api',
  timeout: 15000
});

api.interceptors.request.use((config) => {
  let token = store.state.auth.token;
  if (!token) {
    token = localStorage.getItem('token');
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(r => r, err => {
  if (err.response && err.response.status === 401) {
    store.dispatch('auth/logout');
  }
  return Promise.reject(err);
});

export default api;