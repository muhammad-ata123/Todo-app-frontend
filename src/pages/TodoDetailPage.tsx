import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { GET_TODO } from '../graphql/queries';
import { Todo } from '../utils/todo.interface';
import TodoDetail from '../components/TodoDetail/TodoDetail';
import { CircularProgress, Typography, Container, Box } from '@mui/material';

const TodoDetailPage: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();

    const { data, loading, error } = useQuery(GET_TODO, {
        variables: { id: String(id) },
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
            <Box sx={{ p: 2, bgcolor: 'error.light', borderRadius: 1 }}>
                <Typography color="error" variant="h6">
                    Oops! Something went wrong.
                </Typography>
                <Typography variant="body2">{error.message}</Typography>
            </Box>
        );
    }
    const todo: Todo = data?.todo;

    if (!todo) {
        return (
            <Typography color="error" align="center" sx={{ mt: 4 }}>
                Todo not found
            </Typography>
        );
    }
    return (
        <div className="min-h-screen flex flex-col">
            <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
                <TodoDetail
                    todo={todo}
                    onBack={() => navigate('/')}
                />
            </Container>
        </div>
    );
};

export default TodoDetailPage;
