import { Typography, Box } from '@mui/material';

export default function Dashboard() {
  return (
    <Box className="space-y-4">
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Typography>Welcome to your dashboard! This is a protected page.</Typography>
    </Box>
  );
} 