// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);

    const login = async (email, password) => {
        const response = await axios.post('http://localhost:5000/users/login', {
            email,
            password
        });
        setAuthToken(response.data.token); // Store token
        localStorage.setItem('token', response.data.token); // Persist token
    };

    const logout = () => {
        setAuthToken(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ authToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
