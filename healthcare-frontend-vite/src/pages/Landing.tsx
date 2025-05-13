import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const features = [
  {
    title: '24/7 Virtual Care',
    description: 'Access healthcare professionals anytime, anywhere.'
  },
  {
    title: 'Secure Patient Records',
    description: 'Your health data is encrypted and always protected.'
  },
  {
    title: 'Personalized Health Plans',
    description: 'Get recommendations tailored to your needs.'
  }
];

export default function Landing() {
  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Healthcare Platform</Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">About</Button>
          <Button color="inherit">Contact</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
        <Box textAlign="center" mb={6}>
          <Typography variant="h2" fontWeight={700} gutterBottom>Welcome to Your Health</Typography>
          <Typography variant="h5" color="text.secondary" mb={3}>
            Modern healthcare, at your fingertips.
          </Typography>
          <Button variant="contained" size="large" color="primary">Get Started</Button>
        </Box>
        <Grid container spacing={4}>
          {features.map((feature, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>{feature.title}</Typography>
                <Typography color="text.secondary">{feature.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}