// src/components/OrchidDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrchidById } from '../api';
import { Card, CardMedia, CardContent, Typography, CircularProgress } from '@mui/material';
import './OrchidDetail.css';

const OrchidDetail = () => {
  const { id } = useParams();
  const [orchid, setOrchid] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrchid = async () => {
      const data = await getOrchidById(id);
      setOrchid(data);
      setLoading(false);
    };
    fetchOrchid();
  }, [id]);

  if (loading) {
    return <div className="loading-container"><CircularProgress /></div>;
  }

  if (!orchid) {
    return <Typography variant="h2">Orchid not found</Typography>;
  }

  return (
    <Card className="detail-container">
      <CardMedia
        component="img"
        className="detail-image"
        image={orchid.image}
        alt={orchid.name}
      />
      <CardContent className="detail-content">
        <Typography variant="h2" className="detail-title">{orchid.name}</Typography>
        <Typography variant="body1"><strong>Origin:</strong> {orchid.origin}</Typography>
        <Typography variant="body1"><strong>Color:</strong> {orchid.color}</Typography>
        <Typography variant="body1"><strong>Category:</strong> {orchid.category}</Typography>
        <Typography variant="body1"><strong>Rating:</strong> {orchid.rating}</Typography>
        {orchid.isSpecial && <Typography variant="body1" className="special-badge">This is a special orchid!</Typography>}
      </CardContent>
    </Card>
  );
};

export default OrchidDetail;
