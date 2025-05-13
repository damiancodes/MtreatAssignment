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
} from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const onSubmit = async (data: PatientFormInputs) => {
    setApiError(null);
    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:8000/api/patients/', data);
      setShowSuccess(true);
      reset();
    } catch (error: any) {
      const data = error.response?.data;
      if (data) {
        const messages = Object.values(data).flat().join(' ');
        setApiError(messages);
      } else {
        setApiError(error.message || 'Registration failed');
      }
    } finally {
      setIsSubmitting(false);
    }
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
              Patient Registration
            </Typography>
            <Typography
              variant="body1"
              color={isDark ? 'grey.300' : 'text.secondary'}
              sx={{ mb: 4 }}
            >
              Register as a new patient
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
                Registration successful!
              </Alert>
            </Snackbar>

            <TextField
              label="Full Name"
              fullWidth
              variant="outlined"
              {...register('full_name', { required: 'Full name is required' })}
              error={!!errors.full_name}
              helperText={errors.full_name?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />

            <TextField
              label="Email"
              type="email"
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
              label="Phone Number"
              type="tel"
              fullWidth
              variant="outlined"
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^\d{10,15}$/,
                  message: 'Enter a valid phone number',
                },
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />

            <TextField
              label="Address"
              fullWidth
              variant="outlined"
              multiline
              minRows={3}
              {...register('address', { required: 'Address is required' })}
              error={!!errors.address}
              helperText={errors.address?.message}
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
              disabled={isSubmitting}
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
              {isSubmitting ? (
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
                  <span style={{ visibility: 'hidden' }}>Registering...</span>
                </>
              ) : (
                'Register as Patient'
              )}
            </Button>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
} 