const mongoose = require("mongoose");
const { Schema } = mongoose;

const createContactSchema = new Schema(
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique:true,
        lowercase:true,
        validator: {
            match: [
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                "Please add a valid email string to the email path.",
              ],
            },
      },
      message: {
        type: String,
        required: true,
      }
    },

    {
      timestamps: true,
    }
);

module.exports = mongoose.model("CreateContact", createContactSchema);
