// src/components/Orchid.js
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import getListOfOrchids from '../ListOfOrchids'; // Chỉnh sửa đường dẫn import

const Orchids = () => {
  const [orchids, setOrchids] = useState([]);

  useEffect(() => {
    const fetchOrchids = async () => {
      const data = await getListOfOrchids();
      setOrchids(data);
    };
    fetchOrchids();
  }, []);

  return (
    <Container>
      <Box mt={5}>
        <Grid container spacing={4} justifyContent="center">
          {orchids.map((orchid, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={orchid.image}
                  alt={orchid.name}
                />
                <CardContent style={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {orchid.name}
                  </Typography>
                  <Typography>
                    <strong>Origin:</strong> {orchid.origin}
                  </Typography>
                  <Typography>
                    <strong>Color:</strong> {orchid.color}
                  </Typography>
                  <Typography>
                    <strong>Category:</strong> {orchid.category}
                  </Typography>
                  <Typography>
                    <strong>Rating:</strong> {orchid.rating}
                  </Typography>
                  {orchid.isSpecial && (
                    <Typography color="error">
                      This is a special orchid!
                    </Typography>
                  )}
                </CardContent>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/detail/${orchid.id}`}
                  style={{ margin: '16px' }}
                >
                  Detail
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Orchids;
