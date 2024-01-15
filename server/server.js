const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require("./app/routes/userRoutes")

// const User = require('./app/models/User');

app.use(cors());
app.use(express.json())

app.use('/user', userRoutes) // This prefixes all user routes with '/user'

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect('mongodb+srv://khoobrian123:aQew4uagc2Drtx6K@istyle.il9j72h.mongodb.net/iStyle?retryWrites=true&w=majority');

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

