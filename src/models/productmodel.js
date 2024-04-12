const {Schema} = require("mongoose")
const mongoose = require("mongoose");
const productSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
    //   image: {
    //     type: String,
    //     required: true,
    //   },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    tax:{
      type:String,
      enum:["tax", "non-tax"]
    },
    taxAmount:{
      type: Number,
      required: false,
    }
    
    },
    {
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model("Product", productSchema);
  


  