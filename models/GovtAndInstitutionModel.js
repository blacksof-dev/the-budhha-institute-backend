const mongoose = require("mongoose");

const GovtInstitutionSchema = new mongoose.Schema({

    logo:{
        type:String,
        required:true,
    }
})

const GovtInstitute = mongoose.model('govtInstitute',GovtInstitutionSchema);

module.exports= GovtInstitute;