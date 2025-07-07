const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
 
    cover:{
        type:String,
        required:[true,"Cover Image is required"]
        
    },
    
    tag:{
        type:String,
    },

    title:{
        type:String,
        required:[true,"Title heading is required"],
        minlength: [3, "Title should be at least 3 characters long"],
        maxlength:[200,"Title should not exceed 200 characters"],
    },

    targetLink:{
        type:String,
        required:[true," Link is required"],
    }
});

const NewsArticle = mongoose.model("newsArticle", NewsSchema);

module.exports = NewsArticle;