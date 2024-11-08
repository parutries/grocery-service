const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart'); // Make sure this model is defined

// Route to get the user's cart
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId });
    res.json(cart || { items: [] }); // Return an empty cart if not found
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error });
  }
});

// Route to add an item to the user's cart
router.post('/add-to-cart', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    const itemIndex = cart.items.findIndex(item => item.productId === productId);
    if (itemIndex > -1) {
      // If item already exists, update the quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // If item doesn't exist, add it to the cart
      cart.items.push({ productId, quantity });
    }
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error });
  }
});

// Route to remove an item from the user's cart
router.post('/remove-from-cart', async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (cart) {
      cart.items = cart.items.filter(item => item.productId !== productId);
      await cart.save();
    }
    res.json(cart || { items: [] }); // Return updated cart
  } catch (error) {
    res.status(500).json({ message: 'Error removing from cart', error });
  }
});

module.exports = router;
