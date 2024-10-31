import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const userId = 'yourUserId'; // Get this from the user's session or context

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await axios.get(`http://localhost:5000/orders/user/${userId}`); // Implement this route
            setOrders(response.data);
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <h2>Your Orders</h2>
            <ul>
                {orders.map(order => (
                    <li key={order._id}>Order ID: {order._id} - Status: {order.status}</li>
                ))}
            </ul>
        </div>
    );
};

export default Orders;
