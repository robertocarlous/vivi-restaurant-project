const dotenv = require("dotenv")
dotenv.config()


const bcrypt_salt_round = parseInt(process.env.BCRYPT_SALT_ROUND) || 10;

module.exports = {
  bcrypt_salt_round: bcrypt_salt_round,
};

// database connection
const connectDB = {
  mongodb_connection_url: require('dotenv').config().parsed.MongoURI,
};

module.exports = connectDB;


//jwt configurtaion for login 
const jwtConfig = {
  jwt_key: process.env.JWT_SECRET,
};
module.exports = { jwtConfig };



