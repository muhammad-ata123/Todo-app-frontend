import { Box, Container, Typography, IconButton } from '@mui/material';
import { GitHub, Twitter, LinkedIn, Email } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 4, backgroundColor: '#1976D1', textAlign: 'center' }}>
      <Container maxWidth="md">
        <Typography variant="h6" color="white" gutterBottom>
        TODO TASK FLOW
        </Typography>
        <Typography variant="body2" color="white" gutterBottom>
          Simplify your tasks with elegance and efficiency.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
          {[GitHub, Twitter, LinkedIn, Email].map((Icon, i) => (
            <IconButton key={i} sx={{ color: 'white', '&:hover': { color: 'gray' } }}>
              <Icon />
            </IconButton>
          ))}
        </Box>
        <Typography variant="body2" color="white" sx={{ mt: 2 }}>
          © {new Date().getFullYear()} TODO TASK FLOW. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;