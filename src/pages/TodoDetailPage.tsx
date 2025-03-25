/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { GET_TODOS } from '../graphql/queries';
import { Todo } from '../utils/todo.interface';
import TodoDetail from '../components/TodoDetail/TodoDetail';
import { CircularProgress, Typography, Container, Box } from '@mui/material';

const TodoDetailPage: React.FC = () => {
    const { id } = useParams<{ id?: string }>(); 
    const navigate = useNavigate();

    const { loading, error, data } = useQuery(GET_TODOS, {
        skip: !id,
    });

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Typography color="error" align="center" sx={{ mt: 4 }}>
                Error: {error.message}
            </Typography>
        );
    }

    if (data) console.log('Fetched Data:', data);

    const todo: Todo | undefined = data?.todos?.find((t: Todo) => t.id === id);

    if (!todo) {
        return (
            <Typography color="error" align="center" sx={{ mt: 4 }}>
                Todo not found
            </Typography>
        );
    }

    const handleToggleComplete = () => {
        console.log('Toggling Todo Completion:', todo.id);
        // updateTodo({ variables: { id: todo.id, completed: !todo.completed } });
    };

    const handleEdit = () => {
        navigate(`/todo/${todo.id}/edit`);
    };

    const handleDelete = () => {
        console.log('Deleting Todo:', todo.id);
        // deleteTodo({ variables: { id: todo.id } });
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
                <TodoDetail
                    todo={todo}
                    onBack={() => navigate('/')}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggleComplete={handleToggleComplete}
                />
            </Container>
        </div>
    );
};

export default TodoDetailPage;
