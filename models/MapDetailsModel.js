const mongoose = require("mongoose");

const MapDetailsSchema = new mongoose.Schema({
   
    digit:{
        type:String,
        required:true,
    },

    description:{
        type:String,
        required:[true,"Description is required"],
        minlength: [3, "Description should be at least 3 characters long"],
        maxlength:[200,"Description should not exceed 200 characters"],
    }
})

const MapDetails = mongoose.model('MapDetails',MapDetailsSchema);

module.exports= MapDetails;