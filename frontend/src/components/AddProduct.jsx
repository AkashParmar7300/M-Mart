// components/AddProduct.js
import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [product, setProduct] = useState({ name: '', price: '', category: '', imageUrl: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.name || !product.price || !product.category || !product.imageUrl) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post('/api/products/add', product);
      setProduct({ name: '', price: '', category: '', imageUrl: '' }); // Reset form
      setError('');
      setLoading(false);
      navigate('/product', { state: { newProduct: data.product } });
    } catch (error) {
      setLoading(false);
      setError('Failed to add product. Please try again.');
      console.error('Failed to add product:', error);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          required
        />
        <select
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          <option value="clothes">Clothes</option>
          <option value="electronics">Electronics</option>
          <option value="furniture">Furniture</option>
        </select>
        <input
          type="text"
          placeholder="Image URL"
          value={product.imageUrl}
          onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
