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
    required: true,
    required: function () {
      return !this.isGoogleAccount;
    }, // Required if not a Google account,
  },
  sex: {
    type: String,
    required: false,
  },
  height: {
    type: Number,
    required: false,
  },
  isMetric: {
    type: Boolean,
    required: false,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true, // Add this line to allow multiple null values
  },
  isGoogleAccount: {
    type: Boolean,
    deffault: false,
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

// Return only relevent information
userSchema.methods.toSafeObject = function () {
    const {
        _id,
        email,
        firstName,
        lastName
    } = this;

    return {
        id: _id,
        email,
        firstName,
        lastName
    };
}

module.exports = mongoose.model('User', userSchema);
