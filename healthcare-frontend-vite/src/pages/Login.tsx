import { useForm } from 'react-hook-form';
import { TextField, Button, Typography, Box, Alert, Snackbar } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { loginApi } from '../services/api';
import { useState } from 'react';

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data: { access: string; refresh: string }) => {
      // Store tokens in localStorage
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      setShowSuccess(true);
      setTimeout(() => {
        login();
        navigate('/dashboard');
      }, 2000);
    },
    onError: (error: any) => {
      setApiError(error.response?.data?.detail || error.message || 'Login failed');
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    setApiError(null);
    mutation.mutate(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Typography variant="h4" gutterBottom>Login</Typography>
      {apiError && <Alert severity="error">{apiError}</Alert>}
      <Snackbar open={showSuccess} autoHideDuration={2000} onClose={() => setShowSuccess(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Login successful!
        </Alert>
      </Snackbar>
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email address',
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters',
          },
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={mutation.status === 'pending'}>
        {mutation.status === 'pending' ? 'Logging in...' : 'Login'}
      </Button>
    </Box>
  );
} 