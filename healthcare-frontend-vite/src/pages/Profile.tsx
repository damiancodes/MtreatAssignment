import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../services/api';
import { Typography, Box, CircularProgress, Alert, Paper } from '@mui/material';

export default function Profile() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
  });

  return (
    <Box className="space-y-4" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Profile</Typography>
      {isLoading && <CircularProgress />}
      {error && <Alert severity="error">{(error as Error).message}</Alert>}
      {data && (
        <Paper sx={{ p: 2 }}>
          <Typography><strong>First Name:</strong> {data.first_name}</Typography>
          <Typography><strong>Last Name:</strong> {data.last_name}</Typography>
          <Typography><strong>Email:</strong> {data.email}</Typography>
        </Paper>
      )}
    </Box>
  );
} 