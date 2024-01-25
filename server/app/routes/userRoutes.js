const express = require("express");
const router = express.Router();
const User = require('../models/User');
const Closet = require('../models/Closet')
const bcrypt = require('bcryptjs');

router.post('/signup', async (req, res) => {
  try {
    // Check if the user already exists
    const userExists = await User.findOne({email: req.body.email})
    if (userExists) {
      return res.status(400).send("Email already in use")
    }
    console.log(userExists, 'userExists')

    // Create a new user
    const {name, email, password, sex, height} = req.body;

    const user = new User({name, email, password, sex, height})

		console.log(user, "user");

		// Save the user in the database
		await user.save();
		res.status(201).send("User created Successfully");
	} catch (error) {
		res.status(500).send("Error during registration: " + error.message);
	}
});


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
			return res.status(400).send("Invalid email or password");
		}

		return res.json({
			user: user.toSafeObject(),
		});

	} catch (error) {
		res.status(500).send("Error during login: " + error.message);
	}
});

router.get("/", async (req, res) => {
	try {
		const { user } = req;

		if (user) {
			return res.json({
				user: user.toSafeObject(),
			});
		}
	} catch (error) {
		res.status(500).send("Error during login: " + error.message);
	}
});

router.delete("/", async (req, res) => {
  try {

  } catch (error) {
    res.status(500).send("")
  }
})

module.exports = router;
