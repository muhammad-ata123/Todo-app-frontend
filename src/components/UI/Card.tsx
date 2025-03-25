import React from 'react';
import Card from '@mui/material/Card';
import { CardProps as MuiCardProps } from '@mui/material/Card';

const CustomCard: React.FC<MuiCardProps> = ({ 
  children, 
  elevation = 1,
  ...props 
}) => {
  return (
    <Card
      elevation={elevation}
      {...props}
      sx={{
        borderRadius: '12px',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: props.elevation ? props.elevation * 2 : 2,
        },
        ...props.sx,
      }}
    >
      {children}
    </Card>
  );
};

export default CustomCard;