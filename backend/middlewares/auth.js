const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não enviado!" });
  }

  try {
    const decoded = jwt.verify(token, "MEU_SECRET_SUPER_SEGURO");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token inválido!" });
  }
};
