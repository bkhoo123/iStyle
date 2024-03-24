const { check, validationResult } = require('express-validator');

// Middleware for validating user input
const validateUser = [
  check('firstName').notEmpty().withMessage('First name is required'),
  check('lastName').notEmpty().withMessage('Last name is required'),
  check('email').notEmpty().withMessage('Email is invalid or is required'),
  check('password')
    .isLength({ min: 6})
    .withMessage("Password must be at least 6 characters long")
    .matches(/(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])/)
    .withMessage("Password must include at least one number and one special character")
    .custom((value, {req}) => {
      if (req.body.isGoogleAccount && !value) {
        return true; // If it's a Google account and no password, it's fine
      }
      // If not a Google account, password is required
      return value.length > 0
    })
]

const validateCloset = [
  check('name').notEmpty().withMessage('Name is required'),
  // type validation
  // notes validation
  // items validation
]

const validateItems = [
  
]



// Middleware to handle the result of the validation
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next(); // No errors, proceed to the next middleware
};


module.exports = {
  validateUser,
  handleValidationErrors
};