const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/checkout', orderController.checkout);
router.get('/:orderId', orderController.getOrder);
router.put('/:orderId/status', orderController.updateOrderStatus);

module.exports = router;
