import React from 'react';
import { Todo } from '../../utils/todo.interface';
import { Card, CardContent, Typography, Stack } from '@mui/material';

interface TodoItemProps {
  todo: Todo;
  onSelect: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onSelect }) => {
  return (
    <Card sx={{ cursor: 'pointer', p: 2, mb: 2, '&:hover': { boxShadow: 3 } }} onClick={() => onSelect(todo.id)}>
      <CardContent>
        <Typography
          variant="h6"
          sx={{ textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? 'gray' : 'black' }}
        >
          {todo.title}
        </Typography>
        {todo.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {todo.description}
          </Typography>
        )}
        <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
          Status: {todo.completed ? '✅ Completed' : 'Active'}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
          Created At : {new Date(todo.createdAt).toLocaleString()}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TodoItem;
