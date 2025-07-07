const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    cover:{
        type:String,
        required:[true,"Cover Image is required"],
    },
    title:{
        type:String,
        required:[true,"Title is required"],
        minlength:[3,"Title should be at least 3 characters long"],
        maxlength:[200,"Title should not exceed 200 characters"],
    },
    city:{
        type:String,
        required:[true,"City Name is required"],
        minlength:[3,"City Name should be at least 3 characters long"],
        maxlength:[50,"City Name should not exceed 200 characters"],
    },

    createdBy:{
       type:String,
        required:[true,"CretaedBy is required"],
        minlength:[3,"CretaedBy should be at least 3 characters long"],
        maxlength:[50,"CretaedBy should not exceed 200 characters"],
    },

    websiteLink:{
        type:String,
        required:[true,"Website Link is required"],
    },
});

const Product = mongoose.model("product",ProductSchema);

module.exports = Product;