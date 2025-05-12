export interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: number;
  service: Service;
  appointment_date: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
} 