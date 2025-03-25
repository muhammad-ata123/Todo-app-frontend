import { AppBar, Toolbar, IconButton, Button, Typography, Container, Box } from '@mui/material';
import { DarkMode, LightMode, Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: 'rgba(15, 23, 42, 0.8)', // slate-900 with opacity
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: 'none',
        py: 1
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo with gradient text */}
          <Typography
            component={Link}
            to="/"
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              fontWeight: 700,
              letterSpacing: '.1rem',
              textDecoration: 'none',
              background: 'linear-gradient(45deg, #9c27b0 30%, #ff4081 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              '&:hover': {
                background: 'linear-gradient(45deg, #ff4081 30%, #9c27b0 90%)',
              },
              transition: 'background 0.5s ease',
            }}
          >
            TASKFLOW
          </Typography>

          {/* Right-side buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              onClick={() => setDarkMode(!darkMode)}
              sx={{ 
                color: 'text.secondary',
                '&:hover': { 
                  color: 'primary.main',
                  backgroundColor: 'rgba(156, 39, 176, 0.1)' 
                } 
              }}
            >
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>

            <Button
              component={Link}
              to="/add-task"
              variant="contained"
              startIcon={<Add />}
              sx={{
                background: 'linear-gradient(45deg, #9c27b0 30%, #ff4081 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #ff4081 30%, #9c27b0 90%)',
                  boxShadow: '0 0 15px rgba(156, 39, 176, 0.4)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              New Task
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header