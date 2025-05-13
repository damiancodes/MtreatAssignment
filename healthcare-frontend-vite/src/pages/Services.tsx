import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Box,
  useTheme,
  Fade,
  Zoom,
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';

interface Service {
  id: number;
  name: string;
  description: string;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const { isAuthenticated } = useAuth();
  const isDark = theme.palette.mode === 'dark';

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/services/');
        setServices(response.data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch services');
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
        <Alert
          severity="error"
          sx={{
            mb: 4,
            '& .MuiAlert-icon': {
              fontSize: 32,
            },
          }}
        >
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Fade in timeout={1000}>
        <Box>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              textAlign: 'center',
              mb: 6,
              color: isDark ? 'primary.light' : 'primary.main',
            }}
          >
            Our Healthcare Services
          </Typography>
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid
                key={service.id}
                sx={{
                  width: {
                    xs: '100%',
                    sm: '50%',
                    md: '33.33%',
                  },
                }}
              >
                <Zoom
                  in
                  style={{ transitionDelay: `${index * 100}ms` }}
                  timeout={1000}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme.shadows[8],
                      },
                      bgcolor: isDark ? 'grey.900' : 'background.paper',
                      borderRadius: 4,
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, p: 4 }}>
                      <Typography
                        variant="h5"
                        component="h2"
                        gutterBottom
                        sx={{
                          fontWeight: 600,
                          color: isDark ? 'primary.light' : 'primary.main',
                          mb: 2,
                        }}
                      >
                        {service.name}
                      </Typography>
                      <Typography
                        variant="body1"
                        color={isDark ? 'grey.300' : 'text.secondary'}
                        sx={{ lineHeight: 1.7 }}
                      >
                        {service.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Fade>
    </Container>
  );
} 