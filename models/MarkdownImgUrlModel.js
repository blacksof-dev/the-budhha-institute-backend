const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({

    imageUrl:{
        type:String,
    },

    logoUrl:{
        type:String,
    }

    
});

const Image = new mongoose.model("image", ImageSchema);
module.exports = Image;