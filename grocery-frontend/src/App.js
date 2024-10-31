import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Cart from './components/Cart';
import Orders from './components/Orders';
import Auth from './components/Auth';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleAuthSuccess = () => {
        setIsAuthenticated(true);
    };

    return (
        <Router>
            {isAuthenticated && <Navbar />}
            <Routes>
                {/* If not authenticated, redirect to Auth */}
                <Route path="/" element={isAuthenticated ? <h1>Welcome to the Grocery Delivery Service!</h1> : <Navigate to="/auth" />} />
                <Route path="/products" element={isAuthenticated ? <Products /> : <Navigate to="/auth" />} />
                <Route path="/cart" element={isAuthenticated ? <Cart /> : <Navigate to="/auth" />} />
                <Route path="/orders" element={isAuthenticated ? <Orders /> : <Navigate to="/auth" />} />
                <Route path="/auth" element={<Auth onAuthSuccess={handleAuthSuccess} />} />
            </Routes>
        </Router>
    );
};

export default App;
