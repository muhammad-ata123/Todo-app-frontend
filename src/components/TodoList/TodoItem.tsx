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
  useMediaQuery
} from '@mui/material';
import {
  CheckCircleOutline,
  RadioButtonUnchecked,
  CalendarToday,
  AccessTime
} from '@mui/icons-material';
import { format } from 'date-fns';

interface TodoItemProps {
  todo: Todo;
  onSelect: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ onSelect, todo }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const completedColor = theme.palette.mode === 'dark' ? theme.palette.success.dark : theme.palette.success.light;
  const activeColor = theme.palette.mode === 'dark' ? theme.palette.warning.dark : theme.palette.warning.light;

  const singleTodo: Todo = todo;
  return (
    <Card
      sx={{
        cursor: 'pointer',
        p: isSmallScreen ? 1 : 2,
        mb: 2,
        transition: 'all 0.3s ease',
        borderLeft: `4px solid ${singleTodo.completed ? completedColor : activeColor}`,
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3,
          borderLeftWidth: '6px'
        }
      }}
      onClick={() => onSelect(singleTodo.id)}
    >
      <CardContent sx={{ p: isSmallScreen ? 1 : 2 }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <IconButton size="small" sx={{ p: 0.5 }}>
            {singleTodo.completed ? (
              <CheckCircleOutline color="success" />
            ) : (
              <RadioButtonUnchecked color="action" />
            )}
          </IconButton>
          <Typography
            variant={isSmallScreen ? 'body1' : 'h6'}
            sx={{
              flexGrow: 1,
              textDecoration: singleTodo.completed ? 'line-through' : 'none',
              color: singleTodo.completed ? 'text.disabled' : 'text.primary'
            }}
          >
            {singleTodo.title}
          </Typography>
        </Stack>

        {singleTodo.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 1,
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: isSmallScreen ? 1 : 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {singleTodo.description}
          </Typography>
        )}

        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, mt: 2 }}>
          <Chip
            size="small"
            icon={<CalendarToday fontSize="small" />}
            label={format(new Date(singleTodo.createdAt), 'MMM dd, yyyy')}
            variant="outlined"
          />
          <Chip
            size="small"
            icon={<AccessTime fontSize="small" />}
            label={format(new Date(singleTodo.createdAt), 'hh:mm a')}
            variant="outlined"
          />
          <Chip
            size="small"
            label={singleTodo.completed ? 'Completed' : 'Active'}
            color={singleTodo.completed ? 'success' : 'warning'}
            sx={{ ml: 'auto' }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default TodoItem;