// src/components/News.js
import React from 'react';
import { Container, Typography } from '@mui/material';

const News = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        News
      </Typography>
      <Typography variant="body1">
        This is the News page. Content will be updated soon.
      </Typography>
    </Container>
  );
};

export default News;
