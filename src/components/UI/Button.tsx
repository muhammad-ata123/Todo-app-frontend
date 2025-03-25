import React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { ButtonProps as MuiButtonProps } from '@mui/material/Button';

interface ButtonProps extends MuiButtonProps {
  loading?: boolean;
}

const CustomButton: React.FC<ButtonProps> = ({
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  loading = false,
  children,
  ...props
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      disabled={loading || props.disabled}
      {...props}
      sx={{
        textTransform: 'none',
        borderRadius: '8px',
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
        ...props.sx,
      }}
    >
      {loading ? (
        <CircularProgress size={24} color="inherit" />
      ) : (
        children
      )}
    </Button>
  );
};

export default CustomButton;