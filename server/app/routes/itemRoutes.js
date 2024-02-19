const express = require('express');
const router = express.Router();
const Closet = require("../models/Closet")
const Item = require("../models/Item")
const { authenticateUser } = require("../../utility/auth-helpers.js");

// Route to get all items in a closet
router.get('/closet/:closetId', authenticateUser, async (req, res) => {
  try {
    const { closetId } = req.params;
    const closet = await Closet.findById(closetId).populate('items');
    if (!closet) {
      return res.status(404).send('Closet not found');
    }
    res.status(200).json(closet.items);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to create a new item in a closet
router.post('/closet/:closetId', authenticateUser, async (req, res) => {
  try {
    const { closetId } = req.params;
    const closet = await Closet.findById(closetId);
    if (!closet) {
      return res.status(404).send('Closet not found');
    }

    const newItem = new Item({
      ...req.body,
      closetId: closetId,
    });

    const savedItem = await newItem.save();
    closet.items.push(savedItem._id);
    await closet.save();

    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to update an item by itemId
router.put('/item/:itemId', authenticateUser, async (req, res) => {
  try {
    const { itemId } = req.params;
    const updatedItem = await Item.findByIdAndUpdate(itemId, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).send('Item not found');
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to delete an item by itemId
router.delete('/item/:itemId', authenticateUser, async (req, res) => {
  try {
    const { itemId } = req.params;
    const deletedItem = await Item.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).send('Item not found');
    }
    await Closet.updateMany({}, { $pull: { items: itemId } }); // Remove the item from any closets it might be in
    res.status(200).send(`Item with ID ${itemId} successfully deleted`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});



module.exports = router;