const cartValidator =require("../validators/cartvalidator")
const Cart = require("../models/cartmodel")
const Product = require('../models/productmodel');

const addCart = async (req, res) => {
  try {
      const { error } = cartValidator.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      const { productName, quantity } = req.body;

      // Find the product
      const product = await Product.findOne({ name: productName });
      
      if (!product) {
        console.log("Product not found:", productName); 
        return res.status(404).json({ message: 'Product not found' });
      }

      let totalPrice = product.price * quantity;
      let taxAmount = product.taxAmount;
      let totalTaxAmount = taxAmount * quantity;
      let finalAmount = totalPrice + totalTaxAmount;
      let productPrice = product.price

      console.log(taxAmount,totalPrice, totalTaxAmount, finalAmount, productPrice)

      let cart = await Cart.findOne({ userId: req.user._id }); 
      
      if (!cart) {
        cart = new Cart({ userId: req.user._id, items: [] });
      }

      const itemIndex = cart.items.findIndex(item => item.productName === productName);
      
      if (itemIndex !== -1) {
        cart.items[itemIndex].quantity += quantity;
        totalPrice = product.price * cart.items[itemIndex].quantity;
        finalAmount = totalPrice + totalTaxAmount;
      } else {
        cart.items.push({ productName, quantity, });
      }
      

      cart.totalPrice = totalPrice
      cart.taxAmount = taxAmount
      cart.totalTaxAmount = totalTaxAmount
      cart.finalAmount = finalAmount
      cart.productPrice = productPrice

      await cart.save();

      res.status(200).json({
        status: "Success",
        message: "Cart added successfully", 
        success: true,
          data: {
            cart,
          }
        });
        
  } catch (error) {
      console.error('Error adding product to cart:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};




const getCartItems = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }


    
    res.status(200).json({
    status: "Success",
    data: {
      cart,
    }
    })

  } catch (error) {
    console.error('Error retrieving cart items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const deleteCart = async (req, res) => {
  try {

    const cart = await Cart.findOneAndDelete({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json({
      status: "Success",
      message: "Cart deleted successfully",
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = {addCart,getCartItems, deleteCart}