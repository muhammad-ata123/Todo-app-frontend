import React from 'react';
import TextField from '@mui/material/TextField';
import { TextFieldProps } from '@mui/material/TextField';

const Input: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      variant="outlined"
      fullWidth
      margin="normal"
      {...props}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px',
        },
        ...props.sx,
      }}
    />
  );
};

export default Input;