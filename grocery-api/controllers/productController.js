const Product = require('../models/Product');

// Get all products with optional filters
const getAllProducts = async (req, res) => {
  try {
    const { category, priceMin, priceMax, sort } = req.query;
    let query = {};

    // Apply filters
    if (category) query.category = category;
    if (priceMin) query.price = { ...query.price, $gte: priceMin };
    if (priceMax) query.price = { ...query.price, $lte: priceMax };

    // Fetch products from database
    const products = await Product.find(query).sort(sort ? { [sort]: 1 } : {});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Add a new product (Admin Only)
const addProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;

    // Validate required fields
    if (!name || !price || !category) {
      return res.status(400).json({ message: 'Name, price, description, stock, and category are required' });
    }

    const newProduct = new Product({ name, price, description, category, stock });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add product', error });
  }
};

// Update product details (Admin Only)
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product', error });
  }
};

// Delete (soft delete) a product (Admin Only)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.isAvailable = false; // Mark product as unavailable
    await product.save();
    res.json({ message: 'Product marked as unavailable' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error });
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
