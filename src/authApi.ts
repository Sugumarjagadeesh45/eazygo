import axios from 'axios';

const BASE_URL = 'https://eazygobackend.onrender.com';

export const login = (email: string, password: string) => {
  return axios.post(`${BASE_URL}/api/auth/login`, { email, password });
};
