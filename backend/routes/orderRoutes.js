// server/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Order model

// POST route to create an order
router.post('/api/orders', async (req, res) => {
  const { productId, name, price, quantity, totalPrice, userEmail, orderDate } = req.body;

  try {
    const newOrder = new Order({
      productId,
      name,
      price,
      quantity,
      totalPrice,
      userEmail,
      orderDate,
    });

    await newOrder.save(); // Save to database

    res.status(200).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Failed to place order' });
  }
});

module.exports = router;
