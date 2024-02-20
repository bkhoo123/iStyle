const express = require("express");
const router = express.Router();
const Outfit = require("../models/Outfits.js");
const { authenticateUser } = require("../../utility/auth-helpers.js");

/*
    ~~~~~~~~~ MIDDLEWARE ~~~~~~~~~
*/

// Middleware to get an outfit by ID
async function getOutfit(req, res, next) {
  let outfit;
  try {
    // Find the outfit by ID and ensure it belongs to the current user
    outfit = await Outfit.findOne({ _id: req.params.id, userId: req.user._id });
    if (!outfit) {
      const error = new Error("Outfit not found");
      error.status = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }

  res.outfit = outfit;
  next();
}

/*
    ~~~~~~~~~ Routes ~~~~~~~~~
*/

// POST /outfits
// Add a new outfit
router.post("/outfits", authenticateUser, async (req, res) => {
  try {
    const outfit = new Outfit(req.body);
    const savedOutfit = await outfit.save();
    res.status(201).json(savedOutfit);
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

// GET /outfits
// Get all outfits for a user
router.get("/outfits", authenticateUser, async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user ID is attached to the request by your auth middleware
    const outfits = await Outfit.find({ userId: userId }).populate("items");
    res.json(outfits);
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

// GET /outfits/:id
// Get a single outfit by ID
router.get("/outfits/:id", authenticateUser, getOutfit, (req, res) => {
  res.json(res.outfit);
});

// PUT /outfits/:id
// Modify an existing outfit by ID
router.patch("/outfits/:id", authenticateUser, getOutfit, async (req, res) => {
  Object.assign(res.outfit, req.body);
  try {
    const updatedOutfit = await res.outfit.save();
    res.json(updatedOutfit);
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

// DELETE /outfits/:id
// Remove an outfit by ID
router.delete("/outfits/:id", authenticateUser, getOutfit, async (req, res) => {
  try {
    await res.outfit.remove();
    res.json({ message: "Deleted Outfit" });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

module.exports = router;
