import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { RocketLaunch } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'rgb(25, 118, 210)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.1)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
        py: 1,
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: '#1976D1',
          boxShadow: '0 8px 40px rgba(0, 0, 0, 0.3)'
        }
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              textDecoration: 'none',
              '&:hover': {

                '& .logo-icon': {
                  transform: 'rotate(15deg) scale(1.1)',
                }
              }
            }}
          >
            <RocketLaunch
              className="logo-icon"
              sx={{
                fontSize: 28,
                color: 'white',
                transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)'
              }}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 800,
                letterSpacing: '.15rem',
                background: 'white',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% auto',
                animation: '$gradient 3s ease infinite',
                '&:hover': {
                  color: "white"
                },
                transition: 'all 0.5s ease',
              }}
            >
              TODO TASK FLOW
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;