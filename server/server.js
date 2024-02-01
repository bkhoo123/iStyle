const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require("./app/routes/userRoutes")
const closetRoutes = require("./app/routes/closetRoutes")

// const User = require('./app/models/User');

app.use(cors()); // Cors middleware so that we don't have cor's errors
app.use(express.json()) // middleware so that it uses Json

app.use('/user', userRoutes) // This prefixes all user routes with '/user'
app.use('/closet', closetRoutes) // This prefixes all closet routes with "/closet"
app/use('/item', itemRoutes) // This prefixes all item routes with "/item"

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const username = process.env.MONGO_DB_USERNAME || "khoobrian123"
const password = process.env.MONGO_DB_PASSWORD || "aQew4uagc2Drtx6K"

mongoose.connect(`mongodb+srv://${username}:${password}@istyle.il9j72h.mongodb.net/iStyle?retryWrites=true&w=majority`);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

