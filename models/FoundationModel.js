const mongoose = require("mongoose");

const FoundationSchema = new mongoose.Schema({

    logo:{
        type:String,
        required:true,
    }
})

const Foundation = mongoose.model('foundation',FoundationSchema);

module.exports= Foundation;