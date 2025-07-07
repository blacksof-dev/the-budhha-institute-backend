const mongoose  = require("mongoose");

const UpdateSchema = new mongoose.Schema({

    cover:
    {
        type:String,
        required:[true,"Cover Image is required"]
    },

    tag:
    {
        type:String,
    },

    title:{
        type:String,
        required:[true,"Title heading is required"],
        minlength:[3,"Title should be at least 3 characters long"],
        maxlength:[200,"Title should not exceed 200 characters"],
    },

    description:{
      type:String,
      required:[true,"Description is required"],
      minlength:[3,"Description should be at least 3 characters long"],
      maxlength:[500,'Description should not exceed 500 character'],
    },

    targetpdf:{
        type:String,
         required:[true,"Target Link is required"]
    }
    
},{ timestamps: true });

const Update = mongoose.model("update",UpdateSchema);

module.exports = Update;
