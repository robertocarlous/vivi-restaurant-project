const {Schema} = require("mongoose")
const mongoose = require("mongoose");

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },

      items: [{
        productName: {
          type: String,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          default: 1
        },
      }],
      
        totalPrice:{
          type: Number,
          required:false,
        },
        taxAmount:{
          type: Number,
          required:false,
        },
        totalTaxAmount:{
          type: Number,
          required:false
        },
        finalAmount:{
          type:Number,
          required:false,
        },
        productPrice:{
          type:Number,
          required:false,
        }
        
    }, 

    { timestamps: true });
    
    module.exports = mongoose.model('Cart', cartSchema);
