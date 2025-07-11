import axios from 'axios';

const BASE_URL = 'https://jwttoken-8iax.onrender.com/api/auth';

export const login = (email: string, password: string) => {
  return axios.post(`${BASE_URL}/login`, { email, password });
};

// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'https://jwttoken-8iax.onrender.com/api/auth',
// });

// export const login = (email: string, password: string) =>
//   API.post('/login', { email, password });

// export const register = (name: string, email: string, password: string) =>
//   API.post('/register', { name, email, password });

// export default API;
