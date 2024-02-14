const {authToken} = require("../utils/jwt")
const User = require("../models/usermodel")


const authUser = async (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - Token missing" });
    }

    try {
      const payload = await authToken(token);

      req.user = {
        _id: payload.id,  
        email: payload.email,
        role: payload.role,
      }; 
      next();
      
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "failed",
        message: "Access denied, invalid token.",
      });
    }
  };
  
  module.exports = {authUser}