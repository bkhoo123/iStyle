const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const express = require("express");
const googleAuthRoutes = express.Router();
const User = require("../models/User");
require("dotenv").config();

console.log("Google Client ID", process.env.GOOGLE_CLIENT_ID);
console.log("Google Client secret", process.env.GOOGLE_CLIENT_SECRET);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // Check if a user with the same email exists
          user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            // User with this email exists but signed up without Google
            user.googleId = profile.id;
            user.isGoogleAccount = true;
            await user.save();
          } else {
            // No user with this email or Google ID exists, create new user
            const newUser = new User({
              // ... map profile fields to your User model ...
              googleId: profile.id,
              isGoogleAccount: true,
            });

            user = await newUser.save();
          }
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Route to start authentication
googleAuthRoutes.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route after Google has authenticated the user
googleAuthRoutes.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

module.exports = googleAuthRoutes;
