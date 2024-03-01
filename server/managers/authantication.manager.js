const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const signup = async (body) => {
  try {
    const user = await UserModel.findOne({ email: body.email });
    if (user) return { code: 403, data: "Email already exist" };
    body.password = await bcrypt.hash(body.password, 10);
    const newUser = await UserModel(body).save();
    const token = generateToken(newUser._id);
    return { data: { token, user: newUser }, code: 201 };
  } catch (e) {
    return { code: 500, data: "Internal Server Error" };
  }
};

const login = async (body) => {
  try {
    const { email, password } = body;
    const user = await UserModel.findOne({ email });
    if (!user) return { data: "Invalid email or password", code: 401 };
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return { data: "Invalid email or password", code: 401 };
    const token = generateToken(user._id);
    return { data: { token, user }, code: 200 };
  } catch (e) {
    return { code: 500, data: "Internal Server Error" };
  }
};

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: "1h" });
};

module.exports = {
  login,
  signup,
};
