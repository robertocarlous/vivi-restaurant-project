const express = require('express');
const router = express.Router();
const {isBothAdmin } = require("../middleware/rolemangement");
const {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
} = require("../controller/blogcontroller");
const {authUser} = require("../middleware/authuser")

router.post('/', authUser,isBothAdmin, createBlogPost);
router.get('/', authUser, isBothAdmin,  getAllBlogPosts);
router.get('/:postId', authUser,isBothAdmin, getBlogPostById);
router.put('/:postId', authUser,isBothAdmin,  updateBlogPost);
router.delete('/:postId', authUser,isBothAdmin,  deleteBlogPost);

module.exports = {router};
