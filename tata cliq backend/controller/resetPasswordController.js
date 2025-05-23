const User = require('../models/userModel');  // Your User model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ success: false, message: 'Token and new password are required' });
    }

    // Verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }

    const userId = decoded.userId;

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password in DB
    const user = await User.findByIdAndUpdate(userId, { password: hashedPassword });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'Password has been reset successfully' });

  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = resetPassword;
