const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
  try {
    
    const token = req.cookies?.token;

    console.log("📦 Received Token:", token);

    if (!token) {
      
      return res.status(401).json({
        message: "Please login...!",
        error: true,
        success: false
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        
        return res.status(401).json({
          message: "Invalid or expired token.",
          error: true,
          success: false
        });
      }

      

      // Assuming you sign with userId or _id
      req.userId = decoded.userId || decoded._id;

      console.log("👤 User ID from token:", req.userId);

      next(); // 🔄 Pass control to next middleware or route
    });

  } catch (err) {
  
    res.status(500).json({
      message: err.message || "Internal Server Error",
      error: true,
      success: false
    });
  }
}

module.exports = authToken;
