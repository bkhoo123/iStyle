const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

const User = require('./app/models/User');

app.use(cors());
app.use(express.json())

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect('mongodb+srv://khoobrian123:aQew4uagc2Drtx6K@istyle.il9j72h.mongodb.net/istyle?retryWrites=true&w=majority');

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

app.post('/signup', async (req, res) => {
  try {
    // Check if the user already exists 
    const userExists = await User.findOne({email: req.body.email})
    if (userExists) {
      return res.status(400).send("Email already in use")
    }

    // Create a new user 
    const user = new User(req.body);

    // Save the user in the database
    await user.save();
    res.status(201).send("User created Successfully")
  } catch (error) {
    res.status(500).send('Error during registration')
  }
})


app.post('/login', async (req, res) => {
  try {
    // Find the user by email 
    const user = await User.findOne({ email: req.body.email})
    if (!user) {
      return res.status(400).send('Invalid email or password')
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid email or password")
    }

    res.send("Logged in successfully")
  } catch (error) {
    res.status(500).send('Error during login')
  }
})