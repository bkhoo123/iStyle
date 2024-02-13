const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Calendar Schema
const calendarSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  outfit_id: {
    type: Schema.Types.ObjectId,
    ref: "Outfit",
    required: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  notes: {
    type: String,
    required: false,
    },
  outfits: [
    {
      type: Schema.Types.ObjectId,
      ref: "Outfit",
    },
  ],
});

// Virtual field to get outfits associated with this calendar
calendarSchema.virtual("outfits", {
  ref: "Outfit",
  localField: "_id",
  foreignField: "calendar_id",
});

// Index by user ID
calendarSchema.index({ userId: 1 });

// Ensure to include the virtuals in toJSON and toObject if you want to output them
outfitSchema.set("toJSON", { virtuals: true });
outfitSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Calendar", calendarSchema);
