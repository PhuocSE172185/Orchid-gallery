// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Avatar, Menu, MenuItem } from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './Header.css'; // Import CSS file

const adminEmail = "phuocchse172185@fpt.edu.vn"; // Địa chỉ email admin

const Header = ({ toggleTheme, theme, user, setUser }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, [setUser]);

  const handleClick = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        const userData = res.data;
        userData.role = userData.email === adminEmail ? 'admin' : 'user';
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    handleClose();
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Orchid Gallery
        </Typography>
        <div className="nav-links">
          <Button color="inherit" onClick={toggleTheme}>
            {theme === 'light' ? 'Dark' : 'Light'}
          </Button>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/news">
            News
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
          <Button color="inherit" component={Link} to="/contact">
            Contact
          </Button>
          {user && user.role === 'admin' && (
            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>
          )}
        </div>
        {user ? (
          <>
            <Avatar alt={user.name} src={user.picture} sx={{ cursor: 'pointer' }} onClick={handleMenu} />
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              Hello, {user.name}
            </Typography>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button color="inherit" onClick={handleClick}>
            Login with Google
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
