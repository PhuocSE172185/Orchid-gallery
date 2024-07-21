import React from 'react';
import { Typography } from '@mui/material';

function Footer() {
  return (
    <footer>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        Orchid Gallery {new Date().getFullYear()}
        {'.'}
      </Typography>
    </footer>
  );
}

export default Footer;
