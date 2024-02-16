const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Closet = require("../models/Closet");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const { authenticateUser } = require("../../utility/auth-helpers.js");

console.log("Checxking User", User);

// Passport Local Strategy for email/password login
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      // Match User
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: "Email is not registered" });
      }

      // Match Password
      try {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Password incorrect" });
        }
      } catch (e) {
        return done(e);
      }
    }
  )
);

// POST /user/signup
// Route to create a new user
router.post("/signup", async (req, res, next) => {
  try {
    // Check if the user already exists
    const userExists = await User.findOne({email: req.body.email})
    if (userExists) {
      const error = new Error("Email already in use");
      error.status = 400;
      throw error;
    }
    console.log(userExists, "userExists");

    // Create a new user
    const {firstName, lastName, email, password, sex, height, isMetric} = req.body;


    const user = new User({
      firstName,
      lastName,
      email,
      password,
      sex,
      height,
      isMetric,
    });

    console.log(user, "user");

    // Save the user in the database
    await user.save();

    // Log the user in with passport
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.status(201).send("User created and logged in successfully");
    });
  } catch (error) {
    next(error);
  }
});

// Login Route
router.post('/login', async (req, res) => {
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
    res.status(500).send('Error during login: ' + error.message)
  }
})

// Route to find a user by userId
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params

    if (!userId) {
      return res.status(400).send("User Id is required")
    }

    const user = await User.findOne({userId: userId})
    if (!user) {
      return res.status(404).send("User not found")
    }

    res.send(user)
  } catch (error) {
    res.status(500).send("Error retrieving user by userId " + error.message)
  }
})

// Route to Delete a User
router.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params

    if (!userId) {
      return res.status(404).send("User not found or already deleted.")
    }

    // If all goes well confirm the deletion to the client
    res.status(200).send("User deleted successfully")

  } catch (error) {
    res.status(500).send("Error during deletion: " + error.mesesage)
  }
})

// Route to create a new closet for a user
router.post("/:userId/closets", async (req, res) => {
  try {

  } catch (error) {
    res.status(500).send("")
  }
})

module.exports = router;
