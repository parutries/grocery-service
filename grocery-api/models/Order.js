const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{ productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }],
    totalAmount: { type: Number },
    status: { type: String, default: 'pending' }, // e.g., pending, delivered, canceled
    deliveryStatus: { type: String, default: 'pending' } // e.g., out for delivery, delivered
});

module.exports = mongoose.model('Order', orderSchema);
