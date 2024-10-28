const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
};

exports.getOrder = async (req, res) => {
    const order = await Order.findById(req.params.orderId);
    res.json(order);
};
