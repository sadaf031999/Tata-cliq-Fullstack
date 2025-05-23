// controller/forgotPasswordController.js
const User = require('../models/userModel'); // ✅ correct path
const nodemailer = require('nodemailer'); // ✅ make sure nodemailer is installed
const crypto = require('crypto');

const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    console.log('Received forgot password request for:', email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
    console.log('Generated reset link:', resetLink);

    // Optionally: Save token and expiry to user document here

    const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your@gmail.com',
    pass: 'your-16-character-app-password' // NOT your Gmail login password!
  }
});


    const mailOptions = {
      to: email,
      from: 'your@gmail.com',
      subject: 'Password Reset',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
    };

    await transporter.sendMail(mailOptions);
    console.log('Reset email sent to:', email);

    res.status(200).json({ message: 'Reset email sent' });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = forgotPasswordController;
