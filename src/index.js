// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="337514339438-snc5aht94r0rdjmdjsuck5cepgqp4pt5.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
   
  </React.StrictMode>,
  document.getElementById('root')
);
