const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userModel");

const authentication = async (req, res, next) => {
  const { JWT_SECRET } = process.env;
  try {
    const authToken = req.get("Authorization").replace("Bearer ", "");
    const decodedToken = jwt.verify(authToken, JWT_SECRET);
    const user = await User.findOne({ _id: decodedToken._id });

    if (!user) throw new Error();
    req.user = user;   
    next();
  } catch (error) {
    res.status(401).send("authentification requise!");
  }
};

module.exports = authentication;
