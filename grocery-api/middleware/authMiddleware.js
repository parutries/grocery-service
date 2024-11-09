// authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Path to your User model

const verifyAdmin = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (user && user.role === 'admin') {
        req.user=user;
      next(); // Allow the request to proceed
    } else {
      return res.status(403).json({ message: 'Not authorized as an admin' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};


const verifyUser = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; 
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // JWT_SECRET should be in your .env file
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    req.user = user;  // Attach user to the request object
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { verifyUser , verifyAdmin};

