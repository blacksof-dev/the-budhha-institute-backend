const mongoose = require("mongoose");

const CsoModelSchema = new mongoose.Schema({

    logo:
    {
        type:String,
        required:[true,"Logo image is required"]
    },
    title:{
        type:String,
        required:true,
        minlength: [1, "Title should be at least 1 characters long"],
        maxlength:[500,"Title should not exceed 500 characters"],
    }
})

const CsoModel = mongoose.model('csomodel',CsoModelSchema);

module.exports= CsoModel;