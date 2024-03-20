const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controller/productcontroller");
const {authUser} = require("../middleware/authuser")
//const {isBothAdmin } = require("../middleware/rolemangement");

router.post('/', authUser, createProduct);
router.get('/', authUser,   getAllProduct);
router.get('/:productId', authUser, getProductById);
router.put('/:productId', authUser, updateProduct);
router.delete('/:productId', authUser, deleteProduct);

module.exports = {router};
