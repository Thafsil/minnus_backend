const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({
      err: "authorization denied"
    });
  }
  try {
    const decoded = jwt.verify(token, "jwtsecret");
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(400).json({
      err: "authorization denied"
    });
  }
};
