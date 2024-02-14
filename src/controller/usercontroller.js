const User = require("../models/usermodel")
const bcrypt = require("bcrypt")
const bcryptConfig = require("../config/db")
const signupValidator = require("../validators/userValidator")
const {genToken} = require("../utils/jwt.js")
const nodemailer = require("nodemailer")
const  {
  BadRequestError,
  NotFoundError,
  ConflictError,
  InternalServerError} = require("../middleware/customerror.js")


class UserController {
  static async Register(req, res, next) {
    const { error } = signupValidator.validate(req.body)
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    try {  
      const {email, password, fullname, confirmPassword, phone, referralcode, role} = req.body;
      
      const emailExist = await User.find({email:req.body.email});

      if (emailExist.length > 0) {
        return next(new ConflictError("An account with this email already exists"));
      }
  

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.gmailauth,
    pass: process.env.gmailpass,
  }
});

const mailOptions = {
  from: 'robbertabimbola21@gmail.com',
  to: email,
  subject: 'account sucessfully created',
  text: 'you have successfully sign up to vivis kitchen'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
  return res.status(200).json({message:"signup email sent"})
});


      const saltround = bcrypt.genSaltSync(bcryptConfig.bcrypt_salt_round);
      const hashedPassword =  bcrypt.hashSync(req.body.password, saltround);
      

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
      const user = await User.findOne({email:req.body.email});
      if (!user) {
        return next(new ConflictError("this account does not exists"));
      }
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.gmailauth,
          pass: process.env.gmailpass,
        }
      });
      
      const mailOptions = {
        from: 'robbertabimbola21@gmail.com',
        to: req.body.email,
        subject: 'Vivis-Kitchen ',
        text: 'Hi Robbert, you logged into your account if this login did not originate from you please let us know'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
        return res.status(200).json({message:"signup email sent"})
      });
      const password = bcrypt.compareSync(req.body.password, user.password)
      if(!password){
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




