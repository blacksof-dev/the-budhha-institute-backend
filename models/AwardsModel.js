
const mongoose = require("mongoose");

const AwardSchema = new mongoose.Schema({
 
    cover:{
        type:String,
        required:[true,"Cover Image is required"]
        
    },
    
    title:{
        type:String,
        required:[true,"Title heading is required"],
        minlength: [3, "Title should be at least 3 characters long"],
        maxlength:[200,"Title should not exceed 200 characters"],
    },

    desc:{
        type:String,
        required:[true,"Description is required"],
        minlength: [3, "Title should be at least 3 characters long"],
       
    },

    year:{
        type:Number,
        required:[true,"year is required"],
    }
});

const Awards = mongoose.model("awardSchema", AwardSchema);

module.exports = Awards;