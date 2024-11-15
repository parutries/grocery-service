const Order = require('../models/Order'); // Order model
const Product = require('../models/Product')
const { verifyUser } = require('../middleware/authMiddleware'); // Assuming you use verifyUser for authentication

// Create an order
const createOrder = async (req, res) => {
  try {
    const { products, paymentMethod } = req.body; // Extract products and paymentMethod from the request body

    // Check if products is an array and has items
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Products must be a non-empty array' });
    }

    if (!paymentMethod) {
      return res.status(400).json({ message: 'Payment method is required' });
    }

    let totalPrice = 0;

    // Calculate total price and validate each product
    for (const item of products) {
      const product = await Product.findById(item.product); // Access product directly from item
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.product} not found` });
      }
      totalPrice += product.price * item.quantity;
    }

    // Create a new order object
    const newOrder = new Order({
      user: req.user._id, // Assuming the user is added to the request by the verifyUser middleware
      products,
      totalPrice,
      paymentMethod,
      status: 'pending', // Default status
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
    const { paymentMethod } = req.body;

    if (!paymentMethod) {
      return res.status(400).json({ message: 'Payment method is required' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { paymentMethod },
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

const deleteOrder = async (req, res) => {
  try {
    const orderId  = req.params.id;
    const userId = req.user.id; // Assuming the user ID is available from the authMiddleware
    console.log('orderId:', orderId);
    console.log('userId:', userId);
    // Find the order and ensure it belongs to the authenticated user
    const order = await Order.findOneAndDelete({ _id: orderId, user: userId });

    if (!order) {
      return res.status(404).json({ message: 'Order not found or not authorized to delete' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder
};
