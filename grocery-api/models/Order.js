const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    products: [{ productId: mongoose.Schema.Types.ObjectId, quantity: Number }],
    totalPrice: Number,
    status: { type: String, enum: ['pending', 'delivered', 'canceled'], default: 'pending' }
});

module.exports = mongoose.model('Order', orderSchema);
