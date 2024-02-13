const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  closetId: {
    type: Schema.Types.ObjectId,
    ref: "Closet",
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: false,
  },
  brand: {
    type: String,
    required: false,
  },
  pattern: {
    type: String,
    required: false,
  },
  material: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
  occasion: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
  itemImages: {
    type: [String],
    required: false,
  },
  outfits: [
    {
      type: Schema.Types.ObjectId,
      ref: "Outfit",
    },
  ],
});

// Virtual variable to get outfits associated with this item
itemSchema.virtual("outfits", {
  ref: "Outfit",
  localField: "_id",
  foreignField: "item_id",
});

// Ensure to include the virtuals in toJSON and toObject if you want to output them
itemSchema.set("toJSON", { virtuals: true });
itemSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Item", itemSchema);
