const express = require('express');
const router = express.Router();
const {addCart, getCartItems, deleteCart} = require("../controller/cartcontroller");
const {authUser} = require("../middleware/authuser")


router.post('/', authUser, addCart);
router.get('/', authUser, getCartItems)
router.delete('/:id', authUser, deleteCart)




module.exports = {router};
