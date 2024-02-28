const Product = require("../models/productmodel"); 
const productValidator = require("../validators/productvalidator"); 

const createProduct = async (req, res) => {
  try {
    const { error } = productValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const { name, price, description, tax } = req.body;

    // Check if the product already exists
    const existingProduct = await Product.findOne({name});
    if (existingProduct) {
      return res.status(409).json({ error: "Product already exists" });
    }
    console.log(existingProduct);


    // Create and save the new product
    const product = new Product({ name, price, description, tax });
    const savedProduct = await product.save();

    // Respond with success message
    res.status(200).json({
      status: "Success",
      message: "Product created successfully",
      data: savedProduct,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




const getAllProduct = async (req, res) => {
    try {
      const product = await Product.find();
      res.status(200).json({
        status: "Success",
        message: "Product fetched successfully",
        data: product,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  

  const getProductById = async (req, res) => {
    try {
      const { productId } = req.params;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'product not found.' });
      }
      console.log(productId);
      res.status(200).json({
        status: "Success",
        message: "product fetched successfully",
        data: product,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  


  const updateProduct = async (req, res) => {
    try {
      const { productId } = req.params;
      const { name, price, description } = req.body;
  
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { name, price,description },
        { new: true }
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ error: 'product not found.' });
      }
  
      res.status(200).json({
        status: "Success",
        message: "product updated successfully",
        data: updatedProduct,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


  const deleteProduct = async (req, res) => {
    try {
      const { productId } = req.params;
  
      const deletedProduct = await Product.findByIdAndDelete(productId);
  
      if (!deletedProduct) {
        return res.status(404).json({ error: 'product not found.' });
      }
  
      res.status(200).json({
        status: "Success",
        message: "product deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports ={
    createProduct,
    getAllProduct,
    getProductById,
    updateProduct,
    deleteProduct,

}