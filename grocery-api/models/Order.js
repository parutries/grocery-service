const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [  // Corrected field name from 'items' to 'products'
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  paymentMethod: { type: String, required: true },  // This field is required
  totalPrice: { type: Number, required: true }, // Added totalPrice to schema if it's missing
  status: { type: String, default: 'Processing' },
});

module.exports = mongoose.model('Order', orderSchema);
