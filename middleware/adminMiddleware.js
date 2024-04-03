const User = require("../models/User");
const jwt = require('jsonwebtoken');



// Middleware to check if user is an admin
const isAdmin = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    next();
  };
  
  module.exports = isAdmin;
  