const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB (adjust the connection string if necessary)
mongoose.connect('mongodb://localhost:27017/grocery-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Basic route to handle GET requests to the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Grocery Delivery Service API!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const cors = require('cors');

app.use(cors()); // Enable CORS for all routes
