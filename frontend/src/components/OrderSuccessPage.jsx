import React, { useEffect, useState } from 'react';

const OrderSuccessPage = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from localStorage on component mount
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div className="order-success-page">
      <h2>Placed Orders</h2>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-item">
            <h3>{order.name}</h3>
            <p>Quantity: {order.quantity}</p>
            {/* Ensure totalPrice is displayed correctly */}
           {/* <p>Total Price: ${order.totalPrice ? order.totalPrice : 'N/A'}</p> */}{/* Add fallback if totalPrice is missing */}
            <p>Status: {order.status}</p>
            <p>Order Date: {new Date(order.orderDate).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderSuccessPage;
