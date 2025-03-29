import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, Box, ThemeProvider, createTheme } from '@mui/material';
import Home from './pages/Home';
import TodoDetailPage from './pages/TodoDetailPage';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import TodoList from './components/TodoList/TodoList';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            backgroundColor: (theme) => theme.palette.background.default,
          }}
        >
          <Header />

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 4,
              px: { xs: 2, sm: 3, md: 4 },
              maxWidth: '100%',
              width: '100%',
              margin: '0 auto',
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/todos" element={<TodoList />} />
              <Route path="/todo/:id" element={<TodoDetailPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Box>

          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
