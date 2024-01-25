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
    required: false
  }
})


// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
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
        name,
    } = this;

    return {
        id: _id,
        email,
        name,
    };
}

module.exports = mongoose.model('User', userSchema);
