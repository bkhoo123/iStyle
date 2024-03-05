const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Closet = require("../models/Closet");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const { authenticateUser } = require("../../utility/auth-helpers.js");
const { validateUser, handleValidationErrors } = require('../../utility/express-validator.js');

console.log("Checking User", User);

// Passport Local Strategy for email/password login
passport.use(
	new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
		// Match User
		const user = await User.findOne({ email });
		if (!user) {
			return done(null, false, { message: "Email is not registered" });
		}

		// Match Password
		try {
			const isMatch = await bcrypt.compare(password, user.password);
			if (isMatch) {
				return done(null, user);
			} else {
				return done(null, false, { message: "Password incorrect" });
			}
		} catch (e) {
			return done(e);
		}
	})
);

// POST /user/signup
// Route to create a new user
router.post("/signup", validateUser, handleValidationErrors, async (req, res, next) => {
	try {
		// Check if the user already exists
		const userExists = await User.findOne({ email: req.body.email });
		if (userExists) {
			const error = new Error("Email already in use");
			error.status = 400;
			throw error;
		}
		console.log(userExists, "userExists");

		// Create a new user
		const { firstName, lastName, email, password, sex, height, isMetric } = req.body;

		const user = new User({
			firstName,
			lastName,
			email,
			password,
			sex,
			height,
			isMetric,
		});

		console.log(user, "user");

		// Save the user in the database
		await user.save();

		// Log the user in with passport
		req.logIn(user, (err) => {
			if (err) {
				return next(err);
			}
			// res.status(201).send("User created and logged in successfully");
			res.json({
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				id: user._id
			})
		});
	} catch (error) {
		next(error);
	}
});

// POST /user/login
// Route to log in a user
router.post("/login", async (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) {
			return next(err);
		}

		console.log("user ===>", user);

		if (!user) {
			const error = new Error(info.message);
			error.status = 400;
			return next(error);
		}
		req.logIn(user, (err) => {
			if (err) {
				return next(err);
			}
    //   res.status(201).send("User created and logged in successfully");
		res.json({user: user.toSafeObject()})
		});
	})(req, res, next);
});

// GET /user/:userId
// Route to get user by ID
router.get("/:userId", authenticateUser, async (req, res, next) => {
	try {
		const { userId } = req.params;
		console.log("checking user id", userId);

		if (!userId) {
			const error = new Error("User ID is required");
			error.status = 400;
			throw error;
		}

		// Use findById for a more direct approach
		const user = await User.findById(userId);
		if (!user) {
			const error = new Error("User not found");
			error.status = 404;
			throw error;
		}

		res.json(user.toSafeObject());
	} catch (error) {
		return next(error);
	}
});

// DELETE /user
// Route to Delete a User by email
router.delete("/", authenticateUser, async (req, res, next) => {
	try {
		const { email } = req.body;

		if (!email) {
			const error = new Error("Email required for deletion.");
			error.status = 404;
			throw error;
		}

		console.log("Checking email", email);

		const user = await User.findOne({ email: email });

		if (!user) {
			const error = new Error("User not found");
			error.status = 404;
			throw error;
		}

		console.log("Checking user", user);

		// Check if the logged-in user is the same as the user to be deleted
		if (!req.user || user._id.toString() !== req.user._id.toString()) {
			const error = new Error("Unauthorized to delete this user");
			error.status = 401;
			throw error;
		}

		// Perform the deletion
		await User.findByIdAndDelete(user._id);

		// If all goes well confirm the deletion to the client
		res.status(200).send("User deleted successfully");
	} catch (error) {
		next(error);
	}
});

// POST /user/:userId/closets
// Route to create a new closet for a user
// router.post("/closets", async (req, res) => {
// 	try {
// 	} catch (error) {
// 		res.status(500).send("");
// 	}
// });

// restore session user
router.get("/", async (req, res) => {
    const { user } = req;

    if (user) {
        return res.json({
            user: user.toSafeObject()
        })
    } else {
        return res.json({
            user: null
        })
    }
})

module.exports = router;
