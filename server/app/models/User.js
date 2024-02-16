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
<<<<<<< HEAD
=======
    required: true,
    required: function () {
      return !this.isGoogleAccount;
    }, // Required if not a Google account,
>>>>>>> main
  },
  sex: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: false,
  },
  isMetric: {
    type: Boolean,
    required: true,
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

<<<<<<< HEAD
=======
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

>>>>>>> main
module.exports = mongoose.model('User', userSchema);
