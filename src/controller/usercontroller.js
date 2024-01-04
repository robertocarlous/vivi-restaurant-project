const User = require("../models/usersmodel")
const bcrypt = require("bcrypt")
const bcryptconfig = require("../config/db")
class UserController {
  static async Register(req, res, next) {
    try {
      const { email, password, fullname, confirmPassword, phone, referralcode } = req.body;
      const user = await User.find({email:req.body.email});
      if (user) {
        throw new Error("User already exists");
      }
      const saltround = bcryptconfig.bcrypt_salt_round
      const hashedPassword =  bcrypt.hashSync(password, saltround);

      const newUser = await User.createUser({
        email,
        password: hashedPassword,
        fullname,
        confirmPassword: hashedPassword,
        phone,
        referralcode
      });
     
      res.status(200).json({
        status: "Success",
        message: "User signup successful",
        data: {
          user: newUser,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "failed",
        message: "internal error",
      });
    }
  }
}


module.exports = {UserController};




