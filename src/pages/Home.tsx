import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_TODOS, CREATE_TODO, } from '../graphql/queries';
import { Box, Container, Fab } from '@mui/material';
import { Add } from '@mui/icons-material';
import TodoForm from '../components/TodoForm/TodoForm';
import TodoList from '../components/TodoList/TodoList';

const Home: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [createTodo] = useMutation(CREATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  const handleCreate = (title: string, description: string) => {
    createTodo({ variables: { title, description } });
    setIsFormOpen(false);
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container component="main" sx={{ py: 3, flex: 1 }}>
        {isFormOpen ? (
          <TodoForm
            onSubmit={handleCreate}
            onCancel={() => setIsFormOpen(false)} open={true} />
        ) : (
          <TodoList />
        )}
        {!isFormOpen && (
          <Fab
            color="primary"
            aria-label="add"
            sx={{ bgcolor: "#E2398F", ":hover": "#FF4081", position: 'fixed', bottom: 16, right: 16 }}
            onClick={() => setIsFormOpen(true)}
          >
            <Add />
          </Fab>
        )}
      </Container>
    </Box>
  );
};

export default Home;