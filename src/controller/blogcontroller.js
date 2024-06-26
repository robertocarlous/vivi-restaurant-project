const BlogPost = require("../models/blogmodel");
const User = require("../models/usermodel")

const createBlogPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const blogPost = new BlogPost({ title, content, postedBy:userId });

    const savedBlogPost = await blogPost.save();
    res.status(200).json({
      status: "Success",
      message: "Blog created successfully",
      data: savedBlogPost,
      postedBy: {
        //_id: user._id,
        role: user.role, 
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message, success:false });
  }
};





const getAllBlogPosts = async (req, res) => {
    try {
      const blogPosts = await BlogPost.find().populate('postedBy', 'fullname');
      res.status(200).json({ 
      status: "Success",
      message: "blog fetched sucessfully",
      data:blogPosts
    })
    } catch (error) {
      res.status(500).json({ error: error.message, success:false });
    }
  };
  
  


const getBlogPostById = async (req, res) => {
    try {
      const { postId } = req.params;
      const blogPost = await BlogPost.findById(postId).populate('postedBy', 'fullname');
      
      if (!blogPost) {
        return res.status(404).json({ error: 'Blog post not found.', success: false });
      }
      res.status(200).json({ 
      status: "Success", 
      message: "blog fetched sucessfully",
      data:blogPost
    })

    } catch (error) {
      res.status(500).json({ error: error.message, success: false });
    }
  };




  const updateBlogPost = async (req, res) => {
    try {
      const { postId } = req.params;
      const { title, content } = req.body;
  
      const blogPost = await BlogPost.findById(postId);
  
      if (!blogPost) {
        return res.status(404).json({ error: 'Blog post not found.' , success:false });
      }
  
      if (req.user && (req.user.role === 'admin' || req.user._id.equals(blogPost.postedBy))) {
        blogPost.title = title;
        blogPost.content = content;
        const updatedBlogPost = await blogPost.save();
        res.status(200).json({ 
          status: "Success",
          message: "blog updated sucessfully", success: true,
          data:updatedBlogPost
        })
      } else {
        return res.status(403).json({ error: 'Forbidden! Admin or author access is required.' ,  success:false});
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  


  const deleteBlogPost = async (req, res) => {
    try {
      const { postId } = req.params;
  
      const blogPost = await BlogPost.findById(postId);
  
      if (!blogPost) {
        return res.status(404).json({ error: 'Blog post not found.' });
      }
  
      if (req.user && (req.user.role === 'admin' || req.user._id.equals(blogPost.postedBy))) {
        await blogPost.deleteOne();
        res.status(200).json({ 
          status: "Success",
          message: "blog deleted sucessfully",
        })
      } else {
        return res.status(403).json({ error: 'Forbidden! Admin or author access is required.' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };  

module.exports = {createBlogPost, 
    getAllBlogPosts, 
    getBlogPostById, 
    updateBlogPost, 
    deleteBlogPost};
