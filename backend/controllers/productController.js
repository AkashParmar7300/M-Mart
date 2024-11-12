const Product = require('../models/Product');

// controllers/productController.js
exports.addProduct = async (req, res) => {
  const { name, price, category, imageUrl } = req.body;

  if (!name || !price || !category || !imageUrl) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newProduct = new Product({ name, price, category, imageUrl });
    await newProduct.save();
    res.status(201).json({
      message: 'Product added successfully',
      product: newProduct,
    });
  } catch (error) {
    console.error('Failed to add product:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
};


exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Additional methods for `updateProduct`, `deleteProduct` can be added here
