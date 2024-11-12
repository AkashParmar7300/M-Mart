import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api';
import './Product.css'; // Import the CSS file for styling

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const location = useLocation();
  const navigate = useNavigate();  // For navigation to OrderSuccessPage

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/api/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (location.state && location.state.newProduct) {
      setProducts((prevProducts) => {
        if (prevProducts.some(product => product._id === location.state.newProduct._id)) {
          return prevProducts;
        }
        const updatedProducts = [...prevProducts, location.state.newProduct];
        setFilteredProducts(updatedProducts);
        return updatedProducts;
      });
    }
  }, [location.state]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex((item) => item._id === product._id);
    
    if (existingProductIndex > -1) {
      // If product already exists, increase quantity
      cart[existingProductIndex].quantity += 1;
    } else {
      // If product is new, add to cart with quantity 1
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Save to localStorage
    navigate('/order');
  };

  const handleViewOrderHistory = () => {
    // Navigate to the order success page to view the order history
    navigate('/order-success');
  };

  return (
    <div className="product-container">
      <h1>Product Page</h1>
      <label htmlFor="categoryFilter">Filter by category:</label>
      <select
        id="categoryFilter"
        value={selectedCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
      >
        <option value="All">All</option>
        <option value="clothes">Clothes</option>
        <option value="electronics">Electronics</option>
        <option value="furniture">Furniture</option>
      </select>

      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <p>No products available.</p>
        ) : (
          filteredProducts.map((product, index) => (
            <div className="product-card" key={product._id || index}>
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
            
              <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>

      <button className="view-order-history-button" onClick={handleViewOrderHistory}>
        View Order History
      </button>
      
    </div>
  );
};

export default Product;
