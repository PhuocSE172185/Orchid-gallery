// src/components/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrchids } from '../api';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import './Home.css'; // Import CSS file

const Home = () => {
  const [orchids, setOrchids] = useState([]);

  useEffect(() => {
    const fetchOrchids = async () => {
      const data = await getOrchids();
      setOrchids(data);
    };
    fetchOrchids();
  }, []);

  return (
    <div className="home-container">
      {orchids.map(orchid => (
        <Card key={orchid.id} className="orchid-card">
          <CardMedia
            component="img"
            className="orchid-image"
            image={orchid.image}
            alt={orchid.name}
          />
          <CardContent className="card-content">
            <Typography variant="h5">{orchid.name}</Typography>
            <Typography variant="body2"><strong>Origin:</strong> {orchid.origin}</Typography>
            <Typography variant="body2"><strong>Color:</strong> {orchid.color}</Typography>
            <Typography variant="body2"><strong>Category:</strong> {orchid.category}</Typography>
            <Typography variant="body2"><strong>Rating:</strong> {orchid.rating}</Typography>
          </CardContent>
          <div className="card-actions">
            <Button component={Link} to={`/orchid/${orchid.id}`} variant="contained" color="primary">Detail</Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Home;
