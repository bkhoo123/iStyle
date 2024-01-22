const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new mongoose.Schema({
  item_name: {
    type: String,
    required: true
  },
  closet_id : {
    type: Schema.Types.ObjectId,
    ref: "Closet",
    required: true
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
    required: false
  },
  material: {
    type: String,
    required: false
  },
  color: {
    type: String,
    required: false
  },
  occasion: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model("Item", itemSchema)