const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Outfit Schema
const outfitSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  tags: {
    type: String,
    required: false,
  },
  image_url: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // Virtual field to get items associated with this outfit
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  calendar: [
    {
      type: Schema.Types.ObjectId,
      ref: "Calendar",
    },
  ],
});

// Virtual field to get items associated with this outfit
// outfitSchema.virtual("calendar", {
//   ref: "Calendar",
//   localField: "_id",
//   foreignField: "outfit_id",
// });

// outfitSchema.virtual("items", {
//   ref: "Item",
//   localField: "_id",
//   foreignField: "outfit_id",
// });

// Index by user ID
outfitSchema.index({ userId: 1 });

// Ensure to include the virtuals in toJSON and toObject if you want to output them
outfitSchema.set("toJSON", { virtuals: true });
outfitSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Outfit", outfitSchema);
