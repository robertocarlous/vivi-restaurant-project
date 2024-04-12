const mongoose = require("mongoose");
const { Schema } = mongoose;

const CreateEventSchema = new Schema(
    {
      fullName: {
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
      mobile: {
        type: String,
        required: true,
      },
      noOfGuest: {
        type: Number,
        required: true,
        min: 1
      },
      bookingType: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true
      },
      specialRequest: {
        type: String,
      }
    },
    {
      timestamps: true,
    }
);

module.exports = mongoose.model("CreateEvent", CreateEventSchema);
