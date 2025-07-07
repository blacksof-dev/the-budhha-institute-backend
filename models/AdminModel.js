const mongoose = require("mongoose");
var validator = require('validator');

const UserSchema = new mongoose.Schema({

    fullName:{
        type:String,
        required:[true,"Name is required"],
    },

   email:{
           type:String,
           required:[true,"Email is required"],
           unique:true,
           validate:[validator.isEmail,'Please provide a valid email'],
    },

    role: {
        type: String,
        required: [true, "Role is required"],
        enum: {
            values: ['super admin', 'admin'],
            message: '{VALUE} is not a valid role. Allowed roles are: super admin, admin'
        }
    },

    password: {
        type: String,
        required:true,
        select: false,
        minLength: [6, "Password should have atleast 6 characters"],
      },
    
      resetToken: { type: String, default: null },
      resetTokenExpires: { type: Date, default:null, },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
