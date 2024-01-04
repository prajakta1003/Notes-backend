const User = require("../models/userModel");
const {createToken} = require("../helper/jwtToken")
const bcrypt = require("bcrypt")

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All Field Required!" });
    }
    try {
      const exist = await User.findOne({ email });
      if (exist) {
        return res
          .status(409)
          .json({ error: "Already Registered, Please Login" });
      }
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
  
      const user = await User.create({
        name,
        email,
        password: hash,
      });
      const token = createToken(user._id);
      res.status(201).json({ email, token });
    } catch (error) {
      res.status(500).json({ error: error.message || "An error occurred" });
    }
  };

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Password Does Not Match!" });
    }
    const token = createToken(user._id);
    return res.status(201).json({ email, token });
  } catch (error) {
    res.status(500).json({ error: error.message || "An error occurred" });
  }
};

module.exports = { signup, login };
