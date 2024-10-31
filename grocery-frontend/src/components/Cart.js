import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [error, setError] = useState('');
    const userId = 'yourUserId'; // Replace this with the actual user ID from the session or context

    // Function to fetch the cart items from the server
    const fetchCart = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/cart/${userId}`); // Correct endpoint
            setCart(response.data.cartItems || []); // Adjust based on the response structure
        } catch (err) {
            setError('Error fetching cart: ' + err.message);
            console.error('Error fetching cart:', err);
        }
    };

    useEffect(() => {
        fetchCart(); // Fetch the cart when the component mounts
    }, [userId]); // Run effect whenever userId changes

    // Function to add an item to the cart
    const addToCart = async (productId, quantity) => {
        try {
            await axios.post('http://localhost:5000/cart/add', { productId, quantity, userId }); // Include userId
            fetchCart(); // Refresh cart after adding item
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    // Function to remove an item from the cart
    const removeFromCart = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/cart/${userId}/remove/${productId}`); // Include userId
            fetchCart(); // Refresh cart after removing item
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    return (
        <div>
            <h2>Your Cart</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {cart.map(item => (
                    <li key={item.productId._id}>
                        {item.productId.name} - Quantity: {item.quantity}
                        <button onClick={() => removeFromCart(item.productId._id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => addToCart('example_product_id', 1)}>Add Example Product</button>
        </div>
    );
};

export default Cart;
