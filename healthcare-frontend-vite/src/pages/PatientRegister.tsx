import { useForm } from 'react-hook-form';
import { TextField, Button, Typography, Box, Alert, Snackbar } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

interface PatientFormInputs {
  full_name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

export default function PatientRegister() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<PatientFormInputs>();
  const [apiError, setApiError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit = async (data: PatientFormInputs) => {
    setApiError(null);
    try {
      await axios.post('http://localhost:8000/api/patients/', data);
      setShowSuccess(true);
      reset();
    } catch (error: any) {
      setApiError(error.response?.data?.email?.[0] || error.response?.data?.non_field_errors?.[0] || error.message || 'Registration failed');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 500, mx: 'auto', mt: 6 }} className="space-y-4">
      <Typography variant="h4" gutterBottom>Patient Registration</Typography>
      {apiError && <Alert severity="error">{apiError}</Alert>}
      <Snackbar open={showSuccess} autoHideDuration={2000} onClose={() => setShowSuccess(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Registration successful!
        </Alert>
      </Snackbar>
      <TextField
        label="Full Name"
        fullWidth
        margin="normal"
        {...register('full_name', { required: 'Full name is required' })}
        error={!!errors.full_name}
        helperText={errors.full_name?.message}
      />
      <TextField
        label="Email"
        type="email"
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
      <TextField
        label="Phone Number"
        type="tel"
        fullWidth
        margin="normal"
        {...register('phone', {
          required: 'Phone number is required',
          pattern: {
            value: /^\d{10,15}$/,
            message: 'Enter a valid phone number',
          },
        })}
        error={!!errors.phone}
        helperText={errors.phone?.message}
      />
      <TextField
        label="Address"
        fullWidth
        margin="normal"
        multiline
        minRows={3}
        {...register('address', { required: 'Address is required' })}
        error={!!errors.address}
        helperText={errors.address?.message}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Register
      </Button>
    </Box>
  );
} 