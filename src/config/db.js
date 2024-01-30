const dotenv = require("dotenv")
dotenv.config()



// const bcryptConfig = {
//   bcrypt_salt_round: +process.env.BCRYPT_SALT_ROUND,
// };

// module.exports = bcryptConfig;

// database connection
const connectDB = {
  mongodb_connection_url: require('dotenv').config().parsed.MongoURI,
};

// module.exports = connectDB;