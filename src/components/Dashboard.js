import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Card, CardContent, CardActions, Typography } from '@mui/material';
import { SnackbarProvider, useSnackbar } from 'notistack';
import './Dashboard.css'; // Import CSS file

const Dashboard = () => {
  const [orchids, setOrchids] = useState([]);
  const [currentOrchid, setCurrentOrchid] = useState({
    name: '',
    origin: '',
    color: '',
    category: '',
    rating: '',
    image: ''
  }); // Initialize with empty fields for adding
  const [isEditMode, setIsEditMode] = useState(false); // Track whether we are in edit mode
  const { enqueueSnackbar } = useSnackbar(); // Use the notistack hook

  useEffect(() => {
    fetchOrchids();
  }, []);

  const fetchOrchids = async () => {
    try {
      const response = await axios.get('https://667b5e44bd627f0dcc926246.mockapi.io/orchids');
      setOrchids(response.data);
    } catch (error) {
      console.error('Error fetching orchids:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentOrchid({ ...currentOrchid, [name]: value });
  };

  const handleAddOrchid = async () => {
    try {
      await axios.post('https://667b5e44bd627f0dcc926246.mockapi.io/orchids', currentOrchid);
      fetchOrchids();
      resetForm(); // Clear form after adding
      enqueueSnackbar('Add Orchid Success!', { variant: 'success' });
    } catch (error) {
      console.error('Error adding orchid:', error);
    }
  };

  const handleDeleteOrchid = async (id) => {
    try {
      await axios.delete(`https://667b5e44bd627f0dcc926246.mockapi.io/orchids/${id}`);
      fetchOrchids();
      enqueueSnackbar('Delete Orchid Success!', { variant: 'success' });
    } catch (error) {
      console.error('Error deleting orchid:', error);
    }
  };

  const handleEditOrchid = (orchid) => {
    setCurrentOrchid(orchid); // Set currentOrchid to the selected orchid for editing
    setIsEditMode(true); // Set edit mode to true
  };

  const handleUpdateOrchid = async () => {
    try {
      await axios.put(`https://667b5e44bd627f0dcc926246.mockapi.io/orchids/${currentOrchid.id}`, currentOrchid);
      fetchOrchids();
      resetForm(); // Clear form after updating
      enqueueSnackbar('Update Orchid Success!', { variant: 'success' });
    } catch (error) {
      console.error('Error updating orchid:', error);
    }
  };

  const resetForm = () => {
    setCurrentOrchid({
      name: '',
      origin: '',
      color: '',
      category: '',
      rating: '',
      image: ''
    });
    setIsEditMode(false); // Reset to add mode
  };

  return (
    <div>
      <Typography variant="h4">Dashboard</Typography>
      <Card>
        <CardContent>
          <TextField
            name="name"
            label="Name"
            value={currentOrchid.name}
            onChange={handleInputChange}
          />
          <TextField
            name="origin"
            label="Origin"
            value={currentOrchid.origin}
            onChange={handleInputChange}
          />
          <TextField
            name="color"
            label="Color"
            value={currentOrchid.color}
            onChange={handleInputChange}
          />
          <TextField
            name="category"
            label="Category"
            value={currentOrchid.category}
            onChange={handleInputChange}
          />
          <TextField
            name="rating"
            label="Rating"
            value={currentOrchid.rating}
            onChange={handleInputChange}
          />
          <TextField
            name="image"
            label="Image URL"
            value={currentOrchid.image}
            onChange={handleInputChange}
          />
        </CardContent>
        <CardActions>
          {isEditMode ? (
            <Button className="add-orchid-button" onClick={handleUpdateOrchid}>Update Orchid</Button>
          ) : (
            <Button className="add-orchid-button" onClick={handleAddOrchid}>Add Orchid</Button>
          )}
          <Button onClick={resetForm}>Clear Form</Button>
        </CardActions>
      </Card>
      <div className="dashboard-grid">
        {orchids.map((orchid) => (
          <Card key={orchid.id} className="orchid-card">
            <CardContent>
              <Typography variant="h5">{orchid.name}</Typography>
              <img src={orchid.image} alt={orchid.name} className="orchid-image" />
              <Typography>Origin: {orchid.origin}</Typography>
              <Typography>Color: {orchid.color}</Typography>
              <Typography>Category: {orchid.category}</Typography>
              <Typography>Rating: {orchid.rating}</Typography>
            </CardContent>
            <CardActions>
              <Button onClick={() => handleDeleteOrchid(orchid.id)}>Delete</Button>
              <Button onClick={() => handleEditOrchid(orchid)}>Edit</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

const DashboardWithSnackbar = () => (
  <SnackbarProvider maxSnack={3}>
    <Dashboard />
  </SnackbarProvider>
);

export default DashboardWithSnackbar;
