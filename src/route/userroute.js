const express = require("express");
const UserController = require("../controller/usercontroller")
const {authUser} = require("../middleware/authuser")
const {isSuperAdmin, admin, isBothAdmin} = require("../middleware/rolemangement")


const router = express.Router();

router.post("/signup", UserController.Register);
router.post("/login", UserController.login)

   router.post("/bothadmin", authUser, isBothAdmin,   (req, res) =>{
   res.send("this route is protected for admins")
 }
)

router.post("/admin",  authUser, admin,  (req, res) =>{
  res.send("this route is protected for admin")
})

router.post("/superadmin",  authUser, isSuperAdmin,  (req, res) =>{
  res.send("this route is protected for superadmin")
})




module.exports = { router };
