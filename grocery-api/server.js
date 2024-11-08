require('dotenv').config();

const User = require('./models/User');
const Product = require('./models/Product');
const Cart = require('./models/Cart');
const Order = require('./models/Order');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const port = 5000;
const userRoutes = require('./routes/userRoutes'); // import the user routes


// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/grocery-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.get('/cart', (req, res) => {
    res.json(Cart);
  });
  
app.post('/cart/add', (req, res) => {
    const { productId } = req.body;
    const product = products.find(p => p.id === productId);
    if (product) {
      Cart.push(product);
      res.json({ message: 'Product added to cart', Cart });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  });

  app.post('/cart/remove', (req, res) => {
    const { productId } = req.body;
    Cart = Cart.filter(item => item.id !== productId);
    res.json({ message: 'Product removed from cart', Cart });
  });
  
  app.post('/cart/order', (req, res) => {
    Order.push(...Cart);
    Cart = [];
    res.json({ message: 'Order placed', Order });
  });
  
  // Routes for orders
  app.get('/orders', (req, res) => {
    res.json(Order);
  });

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
