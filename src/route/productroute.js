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
const {isBothAdmin } = require("../middleware/rolemangement");

router.post('/', authUser, isBothAdmin, createProduct);
router.get('/', authUser,  isBothAdmin, getAllProduct);
router.get('/:productId', authUser, isBothAdmin, getProductById);
router.put('/:productId', authUser, isBothAdmin, updateProduct);
router.delete('/:productId', authUser, isBothAdmin, deleteProduct);

module.exports = {router};
