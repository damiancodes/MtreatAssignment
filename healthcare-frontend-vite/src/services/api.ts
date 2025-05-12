import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/auth/',
});

// Add JWT access token to all requests if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if (token) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `JWT ${token}`;
  }
  return config;
});

// Real login API (Djoser JWT)
export async function loginApi({ email, password }: { email: string; password: string }) {
  const response = await api.post('jwt/create/', { email, password });
  return response.data; // { access, refresh }
}

// Real register API (Djoser)
export async function registerApi({ first_name, last_name, email, password, re_password }: { first_name: string; last_name: string; email: string; password: string; re_password: string }) {
  const response = await api.post('users/', { first_name, last_name, email, password, re_password });
  return response.data;
}

// Get current user
export async function getCurrentUser() {
  const response = await api.get('users/me/');
  return response.data;
}

export default api; 