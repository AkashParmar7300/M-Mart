// server/models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  userEmail: { type: String, required: true },
  orderDate: { type: Date, required: true },
});

module.exports = mongoose.model('Order', orderSchema);
