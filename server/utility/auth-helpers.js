// This middleware function checks if the user is authenticated before allowing access to the route.
// Should be used as a middleware in the route that needs to be protected from unauthenticated users.
function authenticateUser(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  const error = new Error("Not authenticated");
  error.status = 401;
  next(error);
}

module.exports = {
  authenticateUser,
};
