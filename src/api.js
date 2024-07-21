// src/api.js
import axios from 'axios';

const API_URL = 'https://667b5e44bd627f0dcc926246.mockapi.io/orchids';

export const getOrchids = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching orchids:', error);
    return [];
  }
};

export const getOrchidById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching orchid:', error);
    return null;
  }
};

export const createOrchid = async (orchid) => {
  try {
    const response = await axios.post(API_URL, orchid);
    return response.data;
  } catch (error) {
    console.error('Error creating orchid:', error);
    return null;
  }
};

export const updateOrchid = async (id, updatedOrchid) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedOrchid);
    return response.data;
  } catch (error) {
    console.error('Error updating orchid:', error);
    return null;
  }
};

export const deleteOrchid = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting orchid:', error);
    return null;
  }
};
