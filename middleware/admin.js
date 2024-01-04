module.exports = async (req, res, next) => {
    if (req.user.userType === "admin") {
      next();
    } else {
      return res.status(401).json({ error: "Unauthorized." });
    }
  };
  