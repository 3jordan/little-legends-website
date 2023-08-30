const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const mongoUrl = 'mongodb://localhost:27017/Little-Legends';

// Middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

// MongoDB Connection
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// User Model
const User = mongoose.model('User', {
  username: String,
  password: String,
});

// Registration Route
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.redirect('/login.html'); // Redirect to login after successful registration
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user.');
  }
});

// Login Route
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).send('Authentication failed.');
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      req.session.userId = user._id; // Store user ID in the session
      res.redirect('/dashboard.html'); // Redirect to the dashboard after successful login
    } else {
      res.status(401).send('Authentication failed.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in.');
  }
});

// Add a route to retrieve sales data
app.get('/sales', async (req, res) => {
  try {
    // Perform a query to retrieve sales data from MongoDB
    const salesData = await db.collection('sales').find({}).toArray();
    res.json(salesData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving sales data.');
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
