const {Schema} = require("mongoose")
const mongoose = require("mongoose");
const BlogPostSchema = new Schema(
    {
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model("BlogPost", BlogPostSchema);
  