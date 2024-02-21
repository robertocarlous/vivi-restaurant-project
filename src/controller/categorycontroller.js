const Category = require("../models/categorymodel");
const categoryValidator = require("../validators/categoryvalidator")

const createCategory = async (req, res) => {
  try {
    const {error} = categoryValidator.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.message });
      }
      
    const { name } = req.body;
    const category = new Category({ name });
    const savedCategory = await category.save();
    res.status(200).json({
      status: "Success",
      message: "Category created successfully",
      data: savedCategory,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      status: "Success",
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found.' });
    }
    console.log(categoryId);
    res.status(200).json({
      status: "Success",
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateCategory = async (req, res) => {
    try {
      const { categoryId } = req.params;
      const { name } = req.body;
  
      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        { name },
        { new: true }
      );
  
      if (!updatedCategory) {
        return res.status(404).json({ error: 'Category not found.' });
      }
  
      res.status(200).json({
        status: "Success",
        message: "Category updated successfully",
        data: updatedCategory,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const deleteCategory = async (req, res) => {
    try {
      const { categoryId } = req.params;
  
      const deletedCategory = await Category.findByIdAndDelete(categoryId);
  
      if (!deletedCategory) {
        return res.status(404).json({ error: 'Category not found.' });
      }
  
      res.status(200).json({
        status: "Success",
        message: "Category deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,

};
