const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.isGoogleAccount;
    }, // Required if not a Google account,
  },
  sex: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  isMetric: {
    type: Boolean,
    required: true,
  },
  googleId: {
    type: String,
    unique: true,
  },
  isGoogleAccount: {
    type: Boolean,
    default: false,
  },
});


// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password') || (this.isNew && !this.isGoogleAccount)) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
