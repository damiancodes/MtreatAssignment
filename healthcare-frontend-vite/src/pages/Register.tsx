import { useForm } from 'react-hook-form';
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Snackbar,
  Container,
  Paper,
  useTheme,
  Fade,
  CircularProgress,
  Grid,
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { registerApi } from '../services/api';
import { useState } from 'react';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';

interface RegisterFormInputs {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  re_password: string;
}

export default function Register() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormInputs>();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const mutation = useMutation<unknown, any, RegisterFormInputs>({
    mutationFn: registerApi,
    onSuccess: () => {
      setShowSuccess(true);
      setTimeout(() => {
        login();
        navigate('/dashboard');
      }, 2000);
    },
    onError: (error: any) => {
      setApiError(error.response?.data?.email?.[0] || error.response?.data?.non_field_errors?.[0] || error.message || 'Registration failed');
    },
  });

  const onSubmit = (data: RegisterFormInputs) => {
    setApiError(null);
    mutation.mutate(data);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Fade in timeout={1000}>
        <Paper
          elevation={isDark ? 8 : 4}
          sx={{
            p: { xs: 3, sm: 6 },
            borderRadius: 4,
            bgcolor: isDark ? 'grey.900' : 'background.paper',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 4,
            }}
          >
            <Box
              sx={{
                bgcolor: isDark ? 'primary.dark' : 'primary.light',
                color: isDark ? 'primary.light' : 'primary.main',
                borderRadius: '50%',
                width: 56,
                height: 56,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
              }}
            >
              <PersonAddOutlinedIcon fontSize="large" />
            </Box>
            <Typography
              component="h1"
              variant="h4"
              sx={{
                fontWeight: 700,
                color: isDark ? 'primary.light' : 'primary.main',
                mb: 1,
              }}
            >
              Create Account
            </Typography>
            <Typography
              variant="body1"
              color={isDark ? 'grey.300' : 'text.secondary'}
              sx={{ mb: 4 }}
            >
              Join our healthcare platform
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {apiError && (
              <Alert
                severity="error"
                sx={{
                  mb: 2,
                  '& .MuiAlert-icon': {
                    fontSize: 32,
                  },
                }}
              >
                {apiError}
              </Alert>
            )}
            <Snackbar
              open={showSuccess}
              autoHideDuration={2000}
              onClose={() => setShowSuccess(false)}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert
                severity="success"
                sx={{
                  width: '100%',
                  '& .MuiAlert-icon': {
                    fontSize: 32,
                  },
                }}
              >
                Registration successful! Redirecting...
              </Alert>
            </Snackbar>

            <Grid container spacing={2}>
              <Grid
                sx={{
                  width: {
                    xs: '100%',
                    sm: '50%',
                  },
                }}
              >
                <TextField
                  label="First Name"
                  fullWidth
                  variant="outlined"
                  {...register('first_name', { required: 'First name is required' })}
                  error={!!errors.first_name}
                  helperText={errors.first_name?.message}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid
                sx={{
                  width: {
                    xs: '100%',
                    sm: '50%',
                  },
                }}
              >
                <TextField
                  label="Last Name"
                  fullWidth
                  variant="outlined"
                  {...register('last_name', { required: 'Last name is required' })}
                  error={!!errors.last_name}
                  helperText={errors.last_name?.message}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
            </Grid>

            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />

            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              variant="outlined"
              {...register('re_password', {
                required: 'Please confirm your password',
                validate: value => value === watch('password') || 'Passwords do not match',
              })}
              error={!!errors.re_password}
              helperText={errors.re_password?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={mutation.status === 'pending'}
              sx={{
                mt: 2,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
                fontWeight: 600,
                position: 'relative',
              }}
            >
              {mutation.status === 'pending' ? (
                <>
                  <CircularProgress
                    size={24}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                  <span style={{ visibility: 'hidden' }}>Creating account...</span>
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
} 