// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import UserLogin from './components/UserLogin';
import UserRegister from './components/UserRegister';
import AdminLogin from './components/AdminLogin';
import AdminRegister from './components/AdminRegister';
import AdminDashboard from './components/AdminDashboard';
import Product from './components/Product';
import Home from './pages/Home';
import AddProduct from './components/AddProduct';
import OrderPage from './components/OrderPage';  // Import the OrderPage component
import OrderSuccessPage from './components/OrderSuccessPage';  // Import the OrderSuccessPage component

const App = () => {
  return (
    <Router>  
      <Routes>
        <Route path="/" element={<Home />} />

        {/* User routes */}
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Product Route */}
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/product" element={<Product />} />

        {/* Order Page Route */}
        <Route path="/order" element={<OrderPage />} /> {/* New OrderPage route */}
        
        {/* Order Success Route */}
        <Route path="/order-success" element={<OrderSuccessPage />} /> {/* New OrderSuccessPage route */}
        
        {/* Additional admin dashboard features can be added here */}
      </Routes>
    </Router>
  );
};

export default App;
