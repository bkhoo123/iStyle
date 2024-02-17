const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const closetSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId, 
    ref: "User"
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false, 
  },
  notes: {
    type: String,
    required: false
  },
  items: [{
    type: Schema.Types.ObjectId, ref: "Item"
  }]
})

module.exports = mongoose.model("Closet", closetSchema)