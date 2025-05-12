import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material';

type RegisterFormInputs = {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
};

export default function Register() {
  const { handleSubmit, control } = useForm<RegisterFormInputs>();

  const onSubmit = (data: RegisterFormInputs) => {
    // TODO: Call your registration API here
    console.log(data);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create your account
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="fullName"
            control={control}
            defaultValue=""
            rules={{ required: 'Full Name is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Full Name"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                required
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address',
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Email address"
                type="email"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                required
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                required
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            rules={{
              required: 'Phone Number is required',
              pattern: {
                value: /^[0-9]{10,15}$/,
                message: 'Invalid phone number',
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Phone Number"
                type="tel"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                required
              />
            )}
          />
          <Controller
            name="address"
            control={control}
            defaultValue=""
            rules={{ required: 'Address is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Address"
                fullWidth
                margin="normal"
                multiline
                minRows={3}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                required
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Create account
          </Button>
        </form>
      </Box>
    </Container>
  );
}