const Order = require('../models/Order'); // Order model
const { verifyUser } = require('../middleware/authMiddleware'); // Assuming you use verifyUser for authentication

// Create an order
const createOrder = async (req, res) => {
  try {
    const { products, totalPrice, paymentMethod } = req.body;  // Make sure to include the necessary fields like products, total price, and paymentMethod

    // Ensure that products are provided
    if (!products || products.length === 0) {
      return res.status(400).json({ message: 'No products specified' });
    }

    // Ensure that paymentMethod is provided
    if (!paymentMethod) {
      return res.status(400).json({ message: 'Payment method is required' });
    }

    // Create a new order object
    const newOrder = new Order({
      user: req.user._id,  // Assuming the user is added to the request by the verifyUser middleware
      products,
      totalPrice,
      paymentMethod, // Adding paymentMethod to the order
      status: 'pending',  // Default status
    });

    // Save the new order to the database
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create order', error });
  }
};

// Get all orders for a user (or all orders for an admin)
const getOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    // If the user is an admin, you can fetch all orders
    const orders = await Order.find(userId ? { user: userId } : {});
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve orders', error });
  }
};

// Update an order's status (e.g., marking as 'shipped', 'delivered', etc.)
const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order', error });
  }
};

module.exports = {
  createOrder,
  getOrders,
  updateOrderStatus,
};
