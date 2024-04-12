const User = require("../models/usermodel");
const bcrypt = require("bcrypt");
const bcryptConfig = require("../config/db");
const signupValidator = require("../validators/userValidator");
const { genToken } = require("../utils/jwt.js");
const { sendEmail } = require("../service/emailservice.js"); 
const {
  BadRequestError,
  NotFoundError,
  ConflictError,
  InternalServerError
} = require("../middleware/customerror.js");

class UserController {
  static async Register(req, res, next) {
    const { error } = signupValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    try {
      const { email, password, fullname, confirmPassword, phone, referralcode, role } = req.body;

      const emailExist = await User.find({ email: req.body.email });

      if (emailExist.length > 0) {
        return next(new ConflictError("An account with this email already exists"));
      }

      try {
        await sendEmail(email, 'Account successfully created', 'Hello, you have successfully signed up to Vivis-kitchen');
        console.log('Signup email sent');
      } catch (error) {
        console.error('Error sending signup email:', error);
      }

      const saltround = bcrypt.genSaltSync(bcryptConfig.bcrypt_salt_round);
      const hashedPassword = bcrypt.hashSync(req.body.password, saltround);

      const newUser = await User.create({
        email,
        password: hashedPassword,
        fullname,
        confirmPassword: hashedPassword,
        phone,
        referralcode,
        role
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
      return next(new InternalServerError("Internal server error"));
    }
  }

  static async login(req, res, next) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return next(new ConflictError("this account does not exists"));
      }

      try {
        await sendEmail(req.body.email, 'Vivis-Kitchen', `Hi ${user.fullname}, you logged into your account. If this login did not originate from you, please let us know.`);
        console.log('Login email sent');
      } catch (error) {
        console.error('Error sending login email:', error);
      }

      const password = bcrypt.compareSync(req.body.password, user.password)
      if (!password) {
        return next(new ConflictError("Incorrect password/email"));
      }

      res.status(200).json({
        status: "Success",
        message: "User login successful",
        logintoken: genToken(user)
      });
    } catch (error) {
      console.log(error);
      return next(new InternalServerError("Internal server error"));
    }
  }
}

module.exports = UserController;
