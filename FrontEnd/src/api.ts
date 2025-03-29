import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:7000/api',
});

export const register = (data: { username: string; email: string; password: string }) =>
  API.post('/register', data);

export const login = (data: { email: string; password: string }) =>
  API.post('/login', data);

export const getUsers = (token: string) =>
  API.get('/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getStats = () => API.get('/stats');
