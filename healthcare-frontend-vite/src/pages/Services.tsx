import { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Container, CircularProgress, Alert } from '@mui/material';

interface Service {
  id: number;
  name: string;
  description: string;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/services/')
      .then(res => {
        setServices(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to fetch services');
        setLoading(false);
      });
  }, []);

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>Healthcare Services</Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {services.map(service => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>{service.name}</Typography>
                <Typography color="text.secondary">{service.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
} 