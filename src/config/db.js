const dotenv = require("dotenv")
dotenv.config()

const bcryptconfig = +process.env.BCRYPT_SALT_ROUND 

module.exports = {
  bcrypt_salt_round: bcryptconfig,
};
