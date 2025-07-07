const mongoose = require("mongoose");
var validator = require('validator');


const LoginSchema = new mongoose.Schema({
    
   fullName:{
        type:String,
    },

    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        validate:[validator.isEmail,'Please provide a valid email'],
    },

    password: {
        type: String,
        select: false,
        minLength: [6, "Password should have atleast 6 characters"],
        match: [
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/,
          "Please enter password in a correct format",
        ],
      }
},  { timestamps: true });


const Login = mongoose.model("login",LoginSchema);

module.exports=Login;