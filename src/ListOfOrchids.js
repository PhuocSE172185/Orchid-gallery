// src/ListOfOrchids.js

import axios from 'axios';

const API_URL = 'https://667b5e44bd627f0dcc926246.mockapi.io/orchids';

const getListOfOrchids = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching orchids:', error);
    return [];
  }
};

export default getListOfOrchids;
