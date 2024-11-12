// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { getToken } from '../utils/auth';
import api from '../api';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = getToken();
      if (!token) {
        window.location.href = '/login'; // Redirect if no token
        return;
      }

      try {
        const { data } = await api.get('/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(data);
      } catch (error) {
        console.error(error);
        window.location.href = '/login'; // Redirect if error
      }
    };

    fetchData();
  }, []);

  if (!userData) return <div>Loading...</div>;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {userData.email}</p>
    </div>
  );
};

export default Dashboard;
