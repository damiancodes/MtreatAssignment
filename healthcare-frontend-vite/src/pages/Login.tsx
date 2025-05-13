import { useForm } from 'react-hook-form';
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Snackbar,
  Paper,
  useTheme,
  Fade,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { loginApi } from '../services/api';
import { useState } from 'react';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

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
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data: { access: string; refresh: string }) => {
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
              <LockOutlinedIcon fontSize="large" />
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
              Welcome Back
            </Typography>
            <Typography
              variant="body1"
              color={isDark ? 'grey.300' : 'text.secondary'}
              sx={{ mb: 4 }}
            >
              Sign in to your account
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
                Login successful! Redirecting...
              </Alert>
            </Snackbar>

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
                  <span style={{ visibility: 'hidden' }}>Logging in...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
} 