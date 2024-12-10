
const jwt = require('jsonwebtoken');
const JWT_SECRET = '123456';


 const authenticateToken = (req, res, next) => {
    const token = req.cookies.token; // Get token from cookies
    if (!token) return res.redirect('/login')
  
    try {
      const verified = jwt.verify(token, JWT_SECRET);
      req.user = verified; // Attach user info to request object
      next();
    } catch (err) {
      res.status(400).json({ error: 'Invalid token' });
    }
  };

  module.exports=authenticateToken;