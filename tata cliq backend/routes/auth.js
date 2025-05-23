// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // MongoDB model
const sendEmail = require('../utils/sendEmail');

const router = express.Router();

// Forgot Password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: true, message: "User not found" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

  const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

  await sendEmail(email, 'Password Reset', `
    <p>Click the link below to reset your password:</p>
    <a href="${resetLink}">Reset Password</a>
  `);

  res.json({ success: true, message: "Reset link sent to email" });
});

// Reset Password
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(decoded.userId, { password: hashedPassword });

    res.json({ success: true, message: "Password reset successfully" });
  } catch (err) {
    res.status(400).json({ error: true, message: "Invalid or expired token" });
  }
});

module.exports = router;
