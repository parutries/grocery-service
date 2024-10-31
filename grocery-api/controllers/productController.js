const Product = require('../models/Product');

// Fetch Products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create Product
exports.createProduct = async (req, res) => {
    const { name, price, description, stock, category } = req.body;
    const newProduct = new Product({ name, price, description, stock, category });

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update Product
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, description, stock, category } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, { name, price, description, stock, category }, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
