// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: ['clothes', 'electronics', 'furniture'], // Add more categories as needed
  },
  imageUrl: {
    type: String,
    required: true, // Make this field required or optional based on your preference
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
