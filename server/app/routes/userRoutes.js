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
    const {firstName, lastName, email, password, sex, height} = req.body;

    const user = new User({firstName, lastName, email, password, sex, height})

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

    res.send("Logged in successfully")
  } catch (error) {
    res.status(500).send('Error during login: ' + error.message)
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
    const { userId } = req.params

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found and therefore can't create a closet for him or her")
    }

    const { name, type, notes} = req.body;

    const newCloset = new Closet({
      name: name,
      type: type,
      notes: notes,
      user: userId
    })

    const savedCloset = await newCloset.save();

    res.status(201).json(savedCloset)

  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = router;
