import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
  Stack,
  useTheme,
  Fade,
  Zoom,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddTaskIcon from '@mui/icons-material/AddTask';
import EditNoteIcon from '@mui/icons-material/EditNote';

interface TodoFormProps {
  onSubmit: (title: string, description: string) => void;
  onCancel: () => void;
  initialTitle?: string;
  initialDescription?: string;
  isEditing?: boolean;
  isLoading?: boolean;
  open: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({
  onSubmit,
  onCancel,
  initialTitle = '',
  initialDescription = '',
  isEditing = false,
  isLoading = false,
  open = true,
}) => {
  const [title, setTitle] = React.useState(initialTitle);
  const [description, setDescription] = React.useState(initialDescription);
  const theme = useTheme();

  React.useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
  }, [initialTitle, initialDescription]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, description);
  };

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Fade}
      PaperProps={{
        sx: {
          borderRadius: 4,
          background: theme.palette.background.paper,
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle sx={{ 
        py: 2,
        px: 3,
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
      }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          {isEditing ? (
            <EditNoteIcon fontSize="medium" />
          ) : (
            <AddTaskIcon fontSize="medium" />
          )}
          <Typography variant="h6" fontWeight={600}>
            {isEditing ? 'Edit Task' : 'Create New Task'}
          </Typography>
          <IconButton
            edge="end"
            onClick={onCancel}
            sx={{
              ml: 'auto',
              color: theme.palette.primary.contrastText,
              '&:hover': {
                background: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      
      <Divider />
      
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ py: 3, px: 3 }}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Task Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              required
              InputProps={{
                sx: {
                  borderRadius: 2,
                  background: theme.palette.background.default,
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main + '!important'
                  }
                }
              }}
              InputLabelProps={{
                shrink: true,
                sx: {
                  fontWeight: 500,
                  color: theme.palette.text.secondary
                }
              }}
            />
            
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details (optional)"
              multiline
              rows={4}
              InputProps={{
                sx: {
                  borderRadius: 2,
                  background: theme.palette.background.default,
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main + '!important'
                  }
                }
              }}
              InputLabelProps={{
                shrink: true,
                sx: {
                  fontWeight: 500,
                  color: theme.palette.text.secondary
                }
              }}
            />
          </Stack>
        </DialogContent>
        
        <Divider />
        
        <DialogActions sx={{ p: 3 }}>
          <Stack direction="row" spacing={2} width="100%">
            <Button
              fullWidth
              size="large"
              variant="outlined"
              onClick={onCancel}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                py: 1.5,
                borderWidth: 2,
                color: theme.palette.text.secondary,
                '&:hover': {
                  borderWidth: 2,
                  background: theme.palette.action.hover
                }
              }}
            >
              Cancel
            </Button>
            
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isLoading}
              startIcon={isEditing ? <EditNoteIcon /> : <AddTaskIcon />}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                py: 1.5,
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                  background: theme.palette.primary.dark
                }
              }}
            >
              <Zoom in={!isLoading}>
                <span>{isEditing ? 'Update Task' : 'Create Task'}</span>
              </Zoom>
            </Button>
          </Stack>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TodoForm;