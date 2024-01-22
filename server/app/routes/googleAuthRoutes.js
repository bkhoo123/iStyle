const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const googleAuthRoutes = express.Router();

const clientId =
  "841783485737-kkul95b2jb7fm99ihagudahh7i3qo2ll.apps.googleusercontent.com";
const clientSecret = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || clientId,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || clientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Here, you would find or create a user in your database
      // Example: User.findOrCreate({ googleId: profile.id }, function (err, user) { return done(err, user); });
    }
  )
);

// Route to start authentication
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route after Google has authenticated the user
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = googleAuthRoutes;
