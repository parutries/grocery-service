import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cart');
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
  }, []);

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.post('http://localhost:5000/cart/remove', { productId });
      setCart(response.data.cart);
      alert('Product removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const orderItems = async () => {
    try {
      const response = await axios.post('http://localhost:5000/cart/order');
      alert(response.data.message);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price}
              <button onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={orderItems}>Order Items in Cart</button>
    </div>
  );
};

export default CartPage;
