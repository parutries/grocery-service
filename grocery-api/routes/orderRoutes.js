const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.get('/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
});

router.post('/place-order', async (req, res) => {
  const { userId, items } = req.body;
  try {
    const order = new Order({ userId, items });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error placing order', error });
  }
});

module.exports = router;
