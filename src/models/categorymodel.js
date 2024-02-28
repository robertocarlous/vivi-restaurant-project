const {Schema} = require("mongoose")
const mongoose = require("mongoose");
const categorySchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
    //   image: {
    //     type: String,
    //     required: true,
    //   },
    },
    {
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model("category", categorySchema);
  


  