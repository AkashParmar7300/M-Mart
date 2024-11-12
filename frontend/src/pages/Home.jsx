// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing

const Home = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Welcome to My Dashboard</h1>
      <p>Please log in or register to access the dashboard.</p>
      
      {/* Section for User Login/Registration */}
      <div style={{ marginBottom: '20px' }}>
        <h2>User</h2>
        <Link to="/user/login">
          <button>Login</button>
        </Link>
        <Link to="/user/register">
          <button>Register</button>
        </Link>
      </div>

      {/* Section for Admin Login/Registration */}
      <div>
        <h2>Admin</h2>
        <Link to="/admin/login">
          <button>Login</button>
        </Link>
        <Link to="/admin/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
