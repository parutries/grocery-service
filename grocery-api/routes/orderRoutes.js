const express = require('express');
const router = express.Router();
const { createOrder, getOrders, updateOrderStatus } = require('../controllers/orderController');
const { verifyUser } = require('../middleware/authMiddleware'); // User verification middleware

// Create an order
router.post('/', verifyUser, createOrder);

// Get orders (for a user or an admin)
router.get('/', verifyUser, getOrders);

// Update order status (for admins)
router.put('/:id', verifyUser, updateOrderStatus);

module.exports = router;
