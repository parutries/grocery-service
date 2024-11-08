import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>{order.name} - ${order.price}</li>
          ))}
        </ul>
      )}
      <button>Proceed to Checkout</button>
    </div>
  );
};

export default OrderPage;
