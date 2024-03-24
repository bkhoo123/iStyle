const express = require('express');
const router = express.Router();
const User = require("../models/User")
const Closet = require("../models/Closet")
const { authenticateUser } = require("../../utility/auth-helpers.js");

// Route to get all closets by userId
router.get("/:userId", authenticateUser, async (req, res) => {
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

// Route to update a closet by closetId
router.put("/:closetId", authenticateUser, async (req, res) => {
  try {
    const { closetId } = req.params;
    const { name, type, notes } = req.body;

    // Update the closet
    const updatedCloset = await Closet.findByIdAndUpdate(
      closetId,
      { name, type, notes },
      { new: true }  // This option returns the modified document rather than the original
    );

    // If no closet was found with the given ID
    if (!updatedCloset) {
      return res.status(404).send("Closet not found");
    }

    // Send the updated closet as a response
    res.status(200).json(updatedCloset);

  } catch (error) {
    res.status(500).send(error.message);
  }
});


// Route to create a new closet for a user
router.post("/:userId", authenticateUser, async (req, res) => {
  try {
    console.log("trying to create new closet");
    const { userId } = req.params
    console.log("userID", userId)

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found and therefore can't create a closet for him or her")
    }

    const { name, type, notes} = req.body;
    console.log("name, type, notes", req.body);

    // creates a new instance of a closet object
    const newCloset = new Closet({
      name: name,
      type: type,
      notes: notes,
      userId: userId
    })

    // saves the closet to the database
    const savedCloset = await newCloset.save();
    console.log("saved closet", savedCloset);

    res.status(201).json(savedCloset)

    // res.status(201).send(`Successfully created a closet for user ${userId}`)

  } catch (error) {
    res.status(500).send(error.message)
  }
})

// Route to delete a closet by closetId
router.delete("/:closetId", authenticateUser, async (req, res) => {
  try {
    const { closetId } = req.params

    // Find the closet and delete it
    const deletedCloset = await Closet.findByIdAndDelete(closetId)

    // If no closet was found with the given ID
    if (!deletedCloset) {
      return res.status(404).send("Closet not found")
    }

    res.status(200).send(`Closet with ID ${closetId} successfully deleted`)

  } catch (error) {
    res.status(500).send(error.message)
  }
})



module.exports = router;
