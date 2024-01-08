const express = require("express");
const UserController = require("../controller/usercontroller")

const router = express.Router();

//router.post("/signup", UserController.Register);
router.post("/login", UserController.login)






module.exports = {
  router: router,
};
