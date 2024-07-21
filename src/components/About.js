// src/components/About.js
import React from 'react';
import { Container, Typography } from '@mui/material';

const About = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1">
        This is the About page. Content will be updated soon.
      </Typography>
    </Container>
  );
};

export default About;
