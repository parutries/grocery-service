import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Auth = ({ onAuthSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = isLogin
                ? await axios.post('http://localhost:5000/users/login', { email, password })
                : await axios.post('http://localhost:5000/users/register', { email, password });

            if (isLogin) {
                onAuthSuccess(); // Call the success handler
                navigate('/'); // Redirect to home page
            }
        } catch (error) {
            console.error('Authentication error:', error);
        }
    };

    return (
        <div>
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </form>
            <button onClick={() => setIsLogin((prev) => !prev)}>
                Switch to {isLogin ? 'Register' : 'Login'}
            </button>
        </div>
    );
};

export default Auth;
