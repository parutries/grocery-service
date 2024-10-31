const Order = require('../models/Order');

// Checkout
exports.checkout = async (req, res) => {
    const { userId, items, totalAmount } = req.body;
    const newOrder = new Order({ userId, items, totalAmount });

    try {
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get Order
exports.getOrder = async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await Order.findById(orderId).populate('items.productId');
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Order Status
exports.updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        res.json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
