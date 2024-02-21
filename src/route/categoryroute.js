const express = require('express');
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controller/categorycontroller");
const {authUser} = require("../middleware/authuser")
const {isBothAdmin } = require("../middleware/rolemangement");

router.post('/', authUser, isBothAdmin, createCategory);
router.get('/', authUser,  isBothAdmin, getAllCategories);
router.get('/:categoryId', authUser, isBothAdmin, getCategoryById);
router.put('/:categoryId', authUser, isBothAdmin, updateCategory);
router.delete('/:categoryId', authUser, isBothAdmin, deleteCategory);

module.exports = {router};
