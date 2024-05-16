const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/dev");

const authenticateUser = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res
      .status(401)
      .json({ success: 0, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);

    req.user = decoded;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: 0, message: "Invalid token" });
  }
};

module.exports = authenticateUser;
