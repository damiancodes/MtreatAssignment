import axios from 'axios';
import { AuthResponse, Patient, Service, Appointment } from '../types';

const API_URL = 'http://127.0.0.1:8001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/token/', { email, password });
    return response.data;
  },
};

export const patients = {
  register: async (data: Omit<Patient, 'id' | 'created_at' | 'updated_at'>): Promise<Patient> => {
    const response = await api.post<Patient>('/patients/', data);
    return response.data;
  },
};

export const services = {
  list: async (): Promise<Service[]> => {
    const response = await api.get<Service[]>('/services/');
    return response.data;
  },
};

export const appointments = {
  list: async (): Promise<Appointment[]> => {
    const response = await api.get<Appointment[]>('/appointments/');
    return response.data;
  },
  create: async (data: { service_id: number; appointment_date: string; notes: string }): Promise<Appointment> => {
    const response = await api.post<Appointment>('/appointments/', data);
    return response.data;
  },
  cancel: async (id: number): Promise<Appointment> => {
    const response = await api.post<Appointment>(`/appointments/${id}/cancel/`);
    return response.data;
  },
};

export default api; 