const express = require("express");
const UserController = require("../controller/usercontroller")
const {authUser} = require("../middleware/authuser")

const router = express.Router();

router.post("/signup", UserController.Register);
router.post("/login", UserController.login)

router.post("/protected", authUser,(req, res) =>{
  res.send("this route is protected")
}
)






module.exports = {
  router: router,
};
