// src/components/UserLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { setToken } from '../utils/auth';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/api/auth/user/login', { email, password });
  
      // Store JWT token to localStorage
      setToken(data.token);
  
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(data.user));  // Store user data correctly
      console.log("User data stored in localStorage:", localStorage.getItem('user'));
  
      // Redirect to Product page
      navigate('/product');
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h2>User Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default UserLogin;
