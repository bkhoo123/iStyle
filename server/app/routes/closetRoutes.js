const express = require('express');
const router = express.Router();
const User = require("../models/User")
const Closet = require("../models/Closet")


// Route to get all closets by userId
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params
    
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).send("User not found")
    }

    const allClosets = await Closet.find({ userId: userId})

    return res.status(200).json(allClosets)

  } catch (error) {
    res.status(500).send(error.message)
  }
})

// Route to create a new closet for a user
router.post("/:userId", async (req, res) => {
  try {
    const { userId } = req.params

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found and therefore can't create a closet for him or her")
    }

    const { name, type, notes} = req.body;

    // creates a new instance of a closet object
    const newCloset = new Closet({
      name: name,
      type: type,
      notes: notes,
      userId: userId
    })

    // saves the closet to the database
    const savedCloset = await newCloset.save();

    // res.status(201).json(savedCloset)

    res.status(201).send(`Successfully created a closet for user ${userId}`)

  } catch (error) {
    res.status(500).send(error.message)
  }
})

//



module.exports = router;