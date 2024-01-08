const User = require("../models/usermodel")
const bcrypt = require("bcrypt")
const bcryptconfig = require("../config/db")
const signupValidator = require("../validators/userValidator")
const {genToken} = require("../utils/jwt.js")



class UserController {
  static async Register(req, res, next) {
    const { error } = signupValidator.validate(req.body)
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    try {  
      const { email, password, fullname, confirmPassword, phone, referralcode } = req.body;

      const emailExist = await User.find({email:req.body.email});

      if (emailExist.length > 0) {
        return res.status(409).json({
          status: "failed",
          message: "An account with this email already exists",
        });
      }
      const saltround = bcrypt.genSaltSync(bcryptconfig.bcrypt_salt_round);
      const hashedPassword =  bcrypt.hashSync(req.body.password, saltround);

      const newUser = await User.create({
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

  

  static async login(req, res, next) {
    try {  
      const user = await User.findOne({email:req.body.email});
      if (!user) {
        return res.status(409).json({
          status: "failed",
          message: "user does not exist",
        });
      }
      const password = bcrypt.compareSync(req.body.password, user.password)
      if(!password){
        return res.status(409).json({
          status:"failed",
          message:"incorrect password/email"
        })
      }

  
      res.status(200).json({
        status: "Success",
        message: "User login successful",
        logintoken: genToken(user)
      
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


module.exports = UserController;




