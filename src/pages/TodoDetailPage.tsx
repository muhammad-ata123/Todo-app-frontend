/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { GET_TODOS } from '../graphql/queries';
import { Todo } from '../utils/todo.interface';
import TodoDetail from '../components/TodoDetail/TodoDetail';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { CircularProgress, Typography, Container, Box } from '@mui/material';

const TodoDetailPage: React.FC = () => {
    const { id } = useParams<{ id?: string }>(); // Ensure `id` is optional
    const navigate = useNavigate();

    const { loading, error, data } = useQuery(GET_TODOS, {
        skip: !id, // Prevent query if ID is missing
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

    // Ensure todos exist before finding the specific one
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
            <Header />
            <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
                <TodoDetail
                    todo={todo}
                    onBack={() => navigate('/')}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggleComplete={handleToggleComplete}
                />
            </Container>
            <Footer />
        </div>
    );
};

export default TodoDetailPage;
