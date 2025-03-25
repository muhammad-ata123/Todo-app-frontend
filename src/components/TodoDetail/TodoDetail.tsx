/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Todo } from '../../utils/todo.interface';
import { Card, CardContent, Typography, Button, Stack, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Chip, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { useMutation } from '@apollo/client';
import { DELETE_TODO, TOGGLE_TODO_STATUS ,GET_TODOS} from '../../graphql/queries';
import EditTodoDialog from '../TodoForm/EditTodoDialog';

interface TodoDetailProps {
  todo: Todo;
  onBack: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onToggleComplete: () => void;
}

const TodoDetail: React.FC<TodoDetailProps> = ({ todo, onBack }) => {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [getTodos] = useMutation(GET_TODOS);
  const [deleteTodo] = useMutation(DELETE_TODO);
  const [toggleStatus] = useMutation(TOGGLE_TODO_STATUS);

  const handleDelete = async () => {
    try {
      await deleteTodo({ variables: { id: todo.id } });
      await getTodos();
      onBack();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleToggleComplete = async () => {
    try {
      await toggleStatus({ variables: { id: todo.id } });
      await getTodos();
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      mt: 4,
      px: 2
    }}>
      <Card sx={{
        maxWidth: 600,
        width: '100%',
        p: 3,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
        borderRadius: 3
      }}>
        {/* Back Button */}
        <Button
          startIcon={<ArrowBackIcon />}
          variant="text"
          color="inherit"
          onClick={onBack}
          sx={{
            mb: 2,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          Back to List
        </Button>

        <CardContent sx={{ p: 0 }}>
          {/* Title and Status */}
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Typography
              variant="h4"
              fontWeight="600"
              sx={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? 'text.disabled' : 'text.primary',
                wordBreak: 'break-word',
                mb: 2
              }}
            >
              {todo.title}
            </Typography>

            <Chip
              label={todo.completed ? 'Completed' : 'Pending'}
              icon={todo.completed ? <DoneIcon /> : <PendingActionsIcon />}
              color={todo.completed ? 'success' : 'warning'}
              variant="outlined"
              sx={{
                height: 32,
                borderRadius: 2,
                borderWidth: 2,
                '& .MuiChip-icon': {
                  fontSize: 18
                }
              }}
            />
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Description */}
          {todo.description && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" fontWeight="500" color="text.secondary" gutterBottom>
                Description
              </Typography>
              <Box sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                p: 2,
                borderRadius: 2,
                borderLeft: '4px solid',
                borderColor: 'primary.main'
              }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.primary',
                    whiteSpace: 'pre-line',
                    wordBreak: 'break-word',
                    lineHeight: 1.6
                  }}
                >
                  {todo.description}
                </Typography>
              </Box>
            </Box>
          )}

          {/* Dates */}
          <Box sx={{
            mt: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5
          }}>
            <Typography variant="caption" color="text.secondary">
              <strong>Created:</strong> {new Date(todo.createdAt).toLocaleString()}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              <strong>Last updated:</strong> {new Date(todo.updatedAt).toLocaleString()}
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
            <Button
              startIcon={todo.completed ? <PendingActionsIcon /> : <DoneIcon />}
              variant={todo.completed ? 'outlined' : 'contained'}
              color={todo.completed ? 'secondary' : 'primary'}
              onClick={handleToggleComplete}
              sx={{
                flexGrow: 1,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none'
                }
              }}
              size="large"
            >
              {todo.completed ? 'Mark Pending' : 'Mark Complete'}
            </Button>

            <Button
              startIcon={<EditIcon />}
              variant="outlined"
              color="info"
              onClick={() => setEditDialogOpen(true)}
              sx={{
                flexGrow: 1,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                textTransform: 'none',
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2
                }
              }}
              size="large"
            >
              Edit
            </Button>

            <Button
              startIcon={<DeleteIcon />}
              variant="contained"
              color="error"
              onClick={() => setDeleteConfirmOpen(true)}
              sx={{
                flexGrow: 1,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: 'error.dark',
                  boxShadow: 'none'
                }
              }}
              size="large"
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
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 1
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "<strong>{todo.title}</strong>"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setDeleteConfirmOpen(false)}
            sx={{
              textTransform: 'none',
              px: 3,
              borderRadius: 2,
              fontWeight: 600
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            sx={{
              textTransform: 'none',
              px: 3,
              borderRadius: 2,
              fontWeight: 600,
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none'
              }
            }}
          >
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