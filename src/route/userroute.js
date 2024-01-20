const express = require("express");
const UserController = require("../controller/usercontroller")
const {authUser} = require("../middleware/authuser")
const {isSuperAdmin, admin} = require("../middleware/superAdminRole")


const router = express.Router();

router.post("/signup", UserController.Register);
router.post("/login", UserController.login)

router.post("/superadmin", authUser, isSuperAdmin,  (req, res) =>{
  res.send("this route is protected for Superadmin")
}
)

router.post("/admin", authUser, admin, (req, res) =>{
  res.send("this route is protected for admin")
})




module.exports = {
  router: router,
};
