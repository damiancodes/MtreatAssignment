import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface NavbarProps {
  onToggleTheme: () => void;
  mode: 'light' | 'dark';
}

interface NavItem {
  text: string;
  path?: string;
  onClick?: () => void;
  auth?: boolean;
}

export default function Navbar({ onToggleTheme, mode }: NavbarProps) {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileOpen(false);
  };

  const navItems: NavItem[] = [
    { text: 'Home', path: '/' },
    { text: 'Services', path: '/services' },
    { text: 'Patient Register', path: '/patient-register' },
    { text: 'Dashboard', path: '/dashboard', auth: true },
    { text: 'Profile', path: '/profile', auth: true },
  ];

  const authItems: NavItem[] = isAuthenticated
    ? [{ text: 'Logout', onClick: handleLogout }]
    : [
        { text: 'Login', path: '/login' },
        { text: 'Register', path: '/register' },
      ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <List>
        {navItems.map((item) => (
          (!item.auth || isAuthenticated) && (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={RouterLink}
                to={item.path || '#'}
                sx={{ textAlign: 'center' }}
              >
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          )
        ))}
        {authItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={item.path ? RouterLink : 'button'}
              to={item.path || undefined}
              onClick={item.onClick}
              sx={{ textAlign: 'center' }}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 700,
            }}
          >
            Healthcare App
          </Typography>
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {navItems.map((item) => (
                (!item.auth || isAuthenticated) && (
                  <Button
                    key={item.text}
                    color="inherit"
                    component={RouterLink}
                    to={item.path || '#'}
                  >
                    {item.text}
                  </Button>
                )
              ))}
              {authItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  component={item.path ? RouterLink : 'button'}
                  to={item.path || undefined}
                  onClick={item.onClick}
                >
                  {item.text}
                </Button>
              ))}
              <IconButton sx={{ ml: 1 }} onClick={onToggleTheme} color="inherit">
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
          )}
          {isMobile && (
            <IconButton sx={{ ml: 1 }} onClick={onToggleTheme} color="inherit">
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
} 