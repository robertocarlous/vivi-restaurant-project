const {Schema} = require("mongoose");
const mongoose = require("mongoose");
const UserSchema = new Schema(
{
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        validator: {
            match: [
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              "Please add a valid email string to the email path.",
            ],
          },
    },
    password:{
        type:String,
        required:true,
    },
    confirmPassword:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:false,
        unique:true,
    },
    referralcode:{
        type:String,
        required:false
    },
    role: {
        type: String,
        enum: ["superadmin", "user", "admin" ],
        default: "role",
      },
},
{
    timestamps:true,
}
);
module.exports = mongoose.model("User", UserSchema);

