import React from 'react';
import { Todo } from '../../utils/todo.interface';
import { 
  Card, 
  CardContent, 
  Typography, 
  Stack, 
  Chip, 
  IconButton, 
  Box,
  useTheme,
  Tooltip
} from '@mui/material';
import {
  CheckCircleOutline,
  RadioButtonUnchecked,
  Edit,
  Delete,
  CalendarToday,
  AccessTime
} from '@mui/icons-material';
import { format } from 'date-fns';


interface TodoItemProps {
  todo: Todo;
  onSelect: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggleComplete?: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ 
  todo, 
  onSelect, 
  onEdit, 
  onDelete, 
  onToggleComplete 
}) => {
  const theme = useTheme();
  const completedColor = theme.palette.mode === 'dark' ? 
    theme.palette.success.dark : theme.palette.success.light;
  const activeColor = theme.palette.mode === 'dark' ? 
    theme.palette.warning.dark : theme.palette.warning.light;

  const handleToggleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleComplete?.(todo.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(todo.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(todo.id);
  };

  return (
    <Card 
      sx={{ 
        cursor: 'pointer', 
        p: 2, 
        mb: 2, 
        transition: 'all 0.3s ease',
        borderLeft: `4px solid ${todo.completed ? completedColor : activeColor}`,
        '&:hover': { 
          transform: 'translateY(-2px)',
          boxShadow: 3,
          borderLeftWidth: '6px'
        }
      }} 
      onClick={() => onSelect(todo.id)}
    >
      <CardContent sx={{ p: 1 }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <IconButton 
            size="small" 
            onClick={handleToggleComplete}
            sx={{ p: 0.5 }}
          >
            {todo.completed ? (
              <CheckCircleOutline color="success" />
            ) : (
              <RadioButtonUnchecked color="action" />
            )}
          </IconButton>
          <Typography
            variant="h6"
            sx={{ 
              flexGrow: 1,
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? 'text.disabled' : 'text.primary'
            }}
          >
            {todo.title}
          </Typography>
          {onEdit && (
            <Tooltip title="Edit">
              <IconButton size="small" onClick={handleEdit}>
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          {onDelete && (
            <Tooltip title="Delete">
              <IconButton size="small" onClick={handleDelete}>
                <Delete fontSize="small" color="error" />
              </IconButton>
            </Tooltip>
          )}
        </Stack>

        {todo.description && (
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mt: 1,
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {todo.description}
          </Typography>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
          <Chip
            size="small"
            icon={<CalendarToday fontSize="small" />}
            label={format(new Date(todo.createdAt), 'MMM dd, yyyy')}
            variant="outlined"
          />
          <Chip
            size="small"
            icon={<AccessTime fontSize="small" />}
            label={format(new Date(todo.createdAt), 'hh:mm a')}
            variant="outlined"
          />
          <Chip
            size="small"
            label={todo.completed ? 'Completed' : 'Active'}
            color={todo.completed ? 'success' : 'warning'}
            sx={{ ml: 'auto' }}
          />
        </Box>

        
      </CardContent>
    </Card>
  );
};

export default TodoItem;