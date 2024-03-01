const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken")
exports.checkAuthorization = async (req, res, next) => {
  const token = req.headers.authorization ? req.headers.authorization?.split(" ")[1] : null;
  if (!token)
    return res.status(401).json({ error: "Unauthorized - No token provided" });

  jwt.verify(token, process.env.SECRET_KEY, async (err) => {
    if (err)return res.status(401).json({ error: "Unauthorized - Invalid token" })});
  const decodedToken = jwt.decode(token);
  const userId = decodedToken?.userId;
  let userData = await UserModel.findOne({ _id: userId });
  if (!userData) return res.status(401).json({ error: "Unauthorized - Invalid token" });
  req.user = userData;
  req.userId = userData._id;
  next();
};
