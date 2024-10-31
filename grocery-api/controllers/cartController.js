const Cart = require('../models/Cart');

// Add to Cart
exports.addToCart = async (req, res) => {
    const userId = req.user.userId
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.productId === productId);

    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
    } else {
        cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(201).json(cart);
};

// Get Cart
exports.getCart = async (req, res) => {
    const  userId  = req.user.userId;
    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
};

// Remove from Cart
exports.removeFromCart = async (req, res) => {
    const userId = req.user.userId
    const productId  = req.params.productId;

    try {
        const cart = await Cart.findOne({ userId });
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
