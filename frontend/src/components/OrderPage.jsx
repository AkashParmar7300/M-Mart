import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderPage.css';

const OrderPage = () => {
  const [cart, setCart] = useState([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const handleIncrease = (productId) => {
    const updatedCart = cart.map(item => 
      item._id === productId ? { 
        ...item, 
        quantity: item.quantity + 1,
        totalPrice: (item.quantity + 1) * item.price 
      } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleDecrease = (productId) => {
    const updatedCart = cart.map(item => 
      item._id === productId && item.quantity > 1 ? { 
        ...item, 
        quantity: item.quantity - 1,
        totalPrice: (item.quantity - 1) * item.price 
      } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleRemove = (productId) => {
    const updatedCart = cart.filter(item => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handlePlaceProductOrder = (product) => {
    setSelectedProduct(product);
    setIsPaymentModalOpen(true);
  };

  const handlePlaceOrder = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSubmit = () => {
  console.log('Payment submitted');
  setPaymentSuccess(true);
  setTimeout(() => {
    setPaymentSuccess(false);

    // Save the order with success status and user email
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const newOrder = cart.map(item => ({
      ...item,
      email: storedUser?.email,  // Add the user's email to the order
      status: 'Success',
      orderDate: new Date().toISOString(),
    }));

    // Store the placed orders (localStorage or global state)
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    localStorage.setItem('orders', JSON.stringify([...storedOrders, ...newOrder]));

    // Clear the cart after successful payment
    setCart([]);
    localStorage.removeItem('cart');

    setIsPaymentModalOpen(false);
    navigate('/order-success'); // Redirect to Order Success page
  }, 2000); // Simulate success response
};


  const getTotalPrice = () => {
    return cart.reduce((total, product) => total + (product.totalPrice || 0), 0);
  };

  return (
    <div className="order-page">
      <h2>Order Page</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((product) => (
          <div key={product._id} className="order-details">
            <img src={product.imageUrl} alt={product.name} className="order-image" />
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <div className="quantity-controls">
              <button onClick={() => handleDecrease(product._id)}>-</button>
              <span>{product.quantity}</span>
              <button onClick={() => handleIncrease(product._id)}>+</button>
            </div>
            <p>Total Price for this product: ${product.totalPrice}</p>
            <button onClick={() => handleRemove(product._id)} className="remove-button">
              Remove from Cart
            </button>
            <button onClick={() => handlePlaceProductOrder(product)} className="place-order-button">
              Place Order for This Product
            </button>
          </div>
        ))
      )}
      <h3>Total Price for All Products: ${getTotalPrice()}</h3>
      <button onClick={handlePlaceOrder} className="place-order-button">
        Place Order for All Products
      </button>

      {isPaymentModalOpen && (
        <div className="payment-modal">
          <div className="payment-modal-content">
            <h2>Payment Gateway</h2>
            <form onSubmit={(e) => { e.preventDefault(); handlePaymentSubmit(); }}>
              <label>
                Card Number:
                <input type="text" placeholder="Enter Card Number" required />
              </label>
              <label>
                Expiry Date:
                <input type="text" placeholder="MM/YY" required />
              </label>
              <label>
                CVV:
                <input type="text" placeholder="CVV" required />
              </label>
              <button type="submit" className="submit-payment-button">Submit Payment</button>
            </form>
            <button onClick={() => setIsPaymentModalOpen(false)} className="close-modal-button">
              Close
            </button>
          </div>
        </div>
      )}

      {paymentSuccess && (
        <div className="success-message">
          <p>Payment Successful! Your order is being processed.</p>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
