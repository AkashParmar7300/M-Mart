import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utils/auth';
import jwt_decode from 'jwt-decode';

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();  // Retrieve token from localStorage
    console.log("Token from localStorage:", token);  // Log the token to check if it's valid
  
    if (!token) {
      navigate('/admin/login');  // Redirect to login if no token
    } else {
      try {
        const user = jwt_decode(token);  // Decode the token to get user info
        console.log("Decoded token:", user);  // Log the decoded token to check its content
  
        setAdmin(user);  // Set the decoded user info
      } catch (error) {
        console.error("Token decoding failed:", error);
        navigate('/admin/login');  // Redirect if token is invalid
      }
    }
  }, [navigate]);
  

  return (
    <div>
      <nav>
        <ul>
          <li><a href="/admin/add-product">Add Product</a></li>
       
          
        </ul>
      </nav>

      <div>
        {admin ? (
          <h2>Welcome, {admin.email}</h2>  // Display email if present
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
