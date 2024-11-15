const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { verifyAdmin } = require('../middleware/authMiddleware');

// Get all products with optional filters
router.get('/', getAllProducts);

// Add a new product (Admin Only)
router.post('/', verifyAdmin, addProduct);

// Update product details (Admin Only)
router.put('/:id', verifyAdmin, updateProduct);

// Delete (soft delete) a product (Admin Only)
router.delete('/:id', verifyAdmin, deleteProduct);

module.exports = router;
