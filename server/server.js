const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
require("dotenv").config();

// Load environment variables
const username = process.env.MONGO_DB_USERNAME || "khoobrian123";
const password = process.env.MONGO_DB_PASSWORD || "aQew4uagc2Drtx6K";

// Initialize express app
const app = express();

// Importing routes
const userRoutes = require("./app/routes/userRoutes");
const closetRoutes = require("./app/routes/closetRoutes");
const googleAuthRoutes = require("./app/routes/googleAuthRoutes");

app.use(cors()); // Cors middleware so that we don't have cor's errors
app.use(express.json()); // middleware so that it uses Json
app.use(express.urlencoded({ extended: false })); // middleware so that it can parse urlencoded data from forms

// Configure express-session
app.use(
  session({
    secret: process.env.PASSPORT_SECRET, // This secret will be used to sign the session ID cookie
    resave: false, // Forces the session to be saved back to the session store
    saveUninitialized: false, // Forces a session that is "uninitialized" to be saved to the store
    // You might also want to set cookie options here if needed
  })
);

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport to use a sessions
passport.serializeUser(function (user, done) {
  done(null, user.id); // or whatever unique identifier you have for your user
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.use("/user", userRoutes); // This prefixes all user routes with '/user'
app.use("/closet", closetRoutes); // This prefixes all closet routes with "/closet"
app.use("/auth/google", googleAuthRoutes); // This prefixes all closet routes with "/closet"

// Default test route to check if the server is running
app.get("/", (req, res) => {
  res.send({ message: "Welcome to iStyle API - Default Route" });
});

// Catch 404 Not Found errors - when no route matches
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// General error handling middleware - for all other errors
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  console.log("Throwing error message ", message);
  console.log("Status code", statusCode);

  res.status(statusCode).send({
    error: message,
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Connect to MongoDB
mongoose.connect(
  `mongodb+srv://${username}:${password}@istyle.il9j72h.mongodb.net/iStyle?retryWrites=true&w=majority`
);

// Confirm connection to MongoDB was successful
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});
