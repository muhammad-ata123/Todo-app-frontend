/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Todo } from '../../utils/todo.interface';
import { Card, CardContent, Typography, Button, Stack, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { useMutation } from '@apollo/client';
import { DELETE_TODO, TOGGLE_TODO_STATUS } from '../../graphql/queries';
import EditTodoDialog from '../TodoForm/EditTodoDialog'; // You'll need to create this component

interface TodoDetailProps {
  todo: Todo;
  onBack: () => void;
  refetchTodos: () => void;
}

const TodoDetail: React.FC<TodoDetailProps> = ({ todo, onBack, refetchTodos }) => {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteTodo] = useMutation(DELETE_TODO);
  const [toggleStatus] = useMutation(TOGGLE_TODO_STATUS);

  const handleDelete = async () => {
    try {
      await deleteTodo({ variables: { id: todo.id } });
      onBack();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleToggleComplete = async () => {
    try {
      await toggleStatus({ variables: { id: todo.id } });
      refetchTodos();
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Card sx={{ maxWidth: 600, width: '100%', p: 3, boxShadow: 3 }}>
        {/* Back Button */}
        <Button 
          startIcon={<ArrowBackIcon />} 
          variant="outlined" 
          color="secondary" 
          onClick={onBack}
          sx={{ mb: 2 }}
        >
          Back to List
        </Button>

        <CardContent>
          {/* Title */}
          <Typography 
            variant="h5" 
            fontWeight="bold" 
            sx={{ 
              textDecoration: todo.completed ? 'line-through' : 'none', 
              color: todo.completed ? 'text.disabled' : 'text.primary',
              wordBreak: 'break-word'
            }}
          >
            {todo.title}
          </Typography>

          {/* Status */}
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
            {todo.completed ? (
              <DoneIcon sx={{ color: 'success.main' }} />
            ) : (
              <PendingActionsIcon sx={{ color: 'warning.main' }} />
            )}
            <Typography variant="subtitle2" color={todo.completed ? 'success.main' : 'warning.main'}>
              {todo.completed ? 'Completed' : 'Pending'}
            </Typography>
          </Stack>

          {/* Description */}
          {todo.description && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" fontWeight="500" color="text.secondary">
                Description:
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.primary', 
                  mt: 1,
                  whiteSpace: 'pre-line',
                  wordBreak: 'break-word'
                }}
              >
                {todo.description}
              </Typography>
            </Box>
          )}

          {/* Dates */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="caption" color="text.secondary">
              Created: {new Date(todo.createdAt).toLocaleString()}
            </Typography>
            <br />
            <Typography variant="caption" color="text.secondary">
              Last updated: {new Date(todo.updatedAt).toLocaleString()}
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
            <Button 
              startIcon={todo.completed ? <PendingActionsIcon /> : <DoneIcon />} 
              variant="contained" 
              color={todo.completed ? 'secondary' : 'primary'} 
              onClick={handleToggleComplete}
              sx={{ flexGrow: 1 }}
            >
              {todo.completed ? 'Mark Pending' : 'Mark Done'}
            </Button>

            <Button 
              startIcon={<EditIcon />} 
              variant="outlined" 
              color="info" 
              onClick={() => setEditDialogOpen(true)}
              sx={{ flexGrow: 1 }}
            >
              Edit
            </Button>

            <Button 
              startIcon={<DeleteIcon />} 
              variant="contained" 
              color="error" 
              onClick={() => setDeleteConfirmOpen(true)}
              sx={{ flexGrow: 1 }}
            >
              Delete
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{todo.title}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <EditTodoDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        todo={todo}
      />
    </Box>
  );
};

export default TodoDetail;