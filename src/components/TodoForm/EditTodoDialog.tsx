import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, CircularProgress } from '@mui/material';
import { Todo } from '../../utils/todo.interface';
import { useMutation } from '@apollo/client';
import { UPDATE_TODO } from '../../graphql/queries';

interface EditTodoDialogProps {
  open: boolean;
  onClose: () => void;
  todo: Todo;
}

const EditTodoDialog: React.FC<EditTodoDialogProps> = ({ open, onClose, todo }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [updateTodo] = useMutation(UPDATE_TODO, {
    onCompleted: () => {
      handleClose();
    },
    onError: (err) => {
      setError(err.message);
    }
  });

  const handleSave = async () => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      await updateTodo({
        variables: {
          id: todo.id,
          input: {
            title: title.trim(),
            description: description.trim() || null
          }
        }
      });
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setError(null);
    onClose();
    setTimeout(() => {
      const focusableElement = document.getElementById("focus-back");
      if (focusableElement) {
        focusableElement.focus();
      }
    }, 100);
  };

  return (
    <>
      <button id="focus-back" style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          {error && <div style={{ color: 'red', marginBottom: '16px' }}>{error}</div>}
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
            error={!!error && !title.trim()}
            helperText={error && !title.trim() ? error : ''}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            variant="contained" 
            color="primary"
            disabled={isSubmitting || !title.trim()}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditTodoDialog;