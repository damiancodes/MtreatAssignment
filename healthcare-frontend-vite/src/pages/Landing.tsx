import { useTheme } from '@mui/material/styles';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import Grid from '@mui/material/Grid';

const features = [
  {
    title: '24/7 Virtual Care',
    description: 'Access healthcare professionals anytime, anywhere.',
    icon: <LocalHospitalIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: 'Secure Patient Records',
    description: 'Your health data is encrypted and always protected.',
    icon: <InfoIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: 'Personalized Health Plans',
    description: 'Get recommendations tailored to your needs.',
    icon: <ContactMailIcon sx={{ fontSize: 40 }} />,
  }
];

export default function Landing() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        bgcolor: isDark ? 'background.default' : 'grey.100',
        minHeight: '100vh',
        py: { xs: 4, sm: 8 },
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          bgcolor: isDark ? 'background.paper' : '#fff',
          borderRadius: 4,
          boxShadow: isDark ? 8 : 2,
          py: { xs: 4, sm: 8 },
          px: { xs: 2, sm: 4 },
        }}
      >
        <Box textAlign="center" mb={{ xs: 5, sm: 7 }}>
          <Typography
            variant="h2"
            fontWeight={800}
            gutterBottom
            color={isDark ? 'primary.light' : 'primary.main'}
            sx={{ fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' } }}
          >
            Welcome to Your Health
          </Typography>
          <Typography
            variant="h5"
            color={isDark ? 'text.secondary' : 'text.primary'}
            mb={4}
            sx={{ fontSize: { xs: '1.1rem', sm: '1.5rem' } }}
          >
            Modern healthcare, at your fingertips.
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="primary"
            sx={{
              px: { xs: 3, sm: 5 },
              py: 1.5,
              fontWeight: 600,
              fontSize: { xs: '1rem', sm: '1.1rem' },
              borderRadius: 3,
              boxShadow: 2,
              width: { xs: '100%', sm: 'auto' },
              maxWidth: 300,
            }}
          >
            Get Started
          </Button>
        </Box>
        <Grid container spacing={5} justifyContent="center" alignItems="stretch">
          {features.map((feature, idx) => (
            <Grid
              item
              xs={12}
              md={4}
              key={idx}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'stretch',
                mt: { md: idx === 1 ? -4 : 0 }, 
              }}
            >
              <Paper
                elevation={isDark ? 8 : 4}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 4,
                  textAlign: 'center',
                  transition: 'box-shadow 0.3s, transform 0.3s',
                  bgcolor: isDark ? 'grey.900' : 'grey.100',
                  color: isDark ? 'grey.100' : 'text.primary',
                  '&:hover': {
                    boxShadow: 16,
                    transform: 'scale(1.04) translateY(-4px)',
                  },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box
                  mb={2}
                  sx={{
                    bgcolor: isDark ? 'primary.dark' : 'primary.light',
                    color: isDark ? 'primary.light' : 'primary.main',
                    borderRadius: '50%',
                    width: 56,
                    height: 56,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    fontSize: 32,
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  {feature.title}
                </Typography>
                <Typography color={isDark ? 'grey.300' : 'text.secondary'}>
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}