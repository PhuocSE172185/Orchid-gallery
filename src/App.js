// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import Home from './components/Home';
import News from './components/News';
import About from './components/About';
import Contact from './components/Contact';
import Dashboard from './components/Dashboard';
import OrchidDetail from './components/OrchidDetail'; // Import OrchidDetail
import './App.css';  // Import CSS file

const App = () => {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const muiTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Router>
        <Header toggleTheme={toggleTheme} theme={theme} user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={user && user.role === 'admin' ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/orchid/:id" element={<OrchidDetail />} /> {/* Đảm bảo route này */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
