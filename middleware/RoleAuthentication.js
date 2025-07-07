function checkRole(requiredRole) {
  return (req, res, next) => {
    try {
      console.log(req.user);
      console.log(req.user.role);

      if (req.user && req.user.role === requiredRole) {
        return next();
      } else {
        return res.status(403).json({
          status: "fail",
          error: "Access denied. You do not have the required permissions.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        error: "An error occurred while checking user role.",
      });
    }
  };
}

module.exports = {
  checkRole,
};
