import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  GET_TODOS, CREATE_TODO,

} from '../graphql/queries';
import { Box, Container, Fab } from '@mui/material';
import { Add } from '@mui/icons-material';
import TodoForm from '../components/TodoForm/TodoForm';
import TodoList from '../components/TodoList/TodoList';

const Home: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { loading, error, data } = useQuery(GET_TODOS);
  const [createTodo] = useMutation(CREATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });
  // const [deleteTodo] = useMutation(DELETE_TODO, {
  //   refetchQueries: [{ query: GET_TODOS }],
  // });
  // const [updateTodo] = useMutation(UPDATE_TODO, {
  //   refetchQueries: [{ query: GET_TODOS }],
  // });


  const handleCreate = (title: string, description: string) => {
    createTodo({ variables: { title, description } });
    setIsFormOpen(false);
  };

  // const handleDelete = (id: string) => {
  //   deleteTodo({ variables: { id } });
  // };

  // const handleToggleComplete = (id: string, completed: boolean) => {
  //   updateTodo({ variables: { id, completed } });
  // };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(data);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container component="main" sx={{ py: 3, flex: 1 }}>
        {isFormOpen ? (
          <TodoForm
            onSubmit={handleCreate}
            onCancel={() => setIsFormOpen(false)}
          />
        ) : (
          <TodoList
            // initialTodos={data?.todos || []}
          />
        )}
        {!isFormOpen && (
          <Fab
            color="primary"
            aria-label="add"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
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