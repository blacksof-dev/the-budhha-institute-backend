const mongoose = require("mongoose");
var validator = require('validator');

const PaymentSchema = new mongoose.Schema({

amount:{

    type:Number,
    required:[true,"Please enter the amount"],
},

fullname:{
    type:String,
    required:[true,"Please Enter your Name"],
    minlength: [3, "Location should be at least 3 characters long"],
    maxlength: [500, "Location should not exceed 500 characters"] 
},

email:{
    type:String,
    required:[true,"Email is required"],
    validate:[validator.isEmail,'Please provide a valid email'],
},

},{ timestamps: true });

const Payment = mongoose.model("payment",PaymentSchema);

module.exports = Payment;