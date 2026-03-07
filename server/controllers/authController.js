const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email and password are required" });
  }

  // Name validation
  const nameRegex = /^[a-zA-Z\s]+$/;
  if (!nameRegex.test(name)) {
    return res.status(400).json({ message: "Name should only contain letters." });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Please enter a valid email address." });
  }

  // Password validation
  if (password.length <= 6) {
    return res.status(400).json({ message: "Password must be more than 6 characters." });
  }

  const emailTrimmed = email.trim();
  const existing = await User.findOne({ email: emailTrimmed });
  if (existing) {
    return res.status(400).json({ message: "This email is already registered. Please login." });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name: name.trim(), email: emailTrimmed, password: hashed });

  res.status(201).json({ message: "Account created. You can now login.", user: { name: user.name, email: user.email } });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Wrong email or password" });
  }

  const user = await User.findOne({ email: email.trim() });
  if (!user) return res.status(400).json({ message: "Wrong email or password" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Wrong email or password" });

  const secret = process.env.JWT_SECRET || "bus-tracker-secret-key";
  const token = jwt.sign({ id: user._id }, secret);

  res.json({ token, user: { name: user.name, email: user.email } });
};
