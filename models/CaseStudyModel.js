const mongoose = require("mongoose");
const Image = require("./MarkdownImgUrlModel");


const CaseStudySchema = new mongoose.Schema({
 
    cover:
    {
        type:String,
        required:[true,"Cover Image is required"]
    },
    
    logo:{
        type:String,
        required:[true,"Logo is required"]
    },
   

    title:{
        type:String,
        required:[true,"Title is required"],
        minlength: [1, "Title should be at least 1 characters long"],
       
    },

    subtitle:{
        type:String,
        required:[true,"Subtitle is required"],
        minlength: [1, "Subtitle should be at least 1 characters long"],
       
    },

    description:{
        type:String,
        required:[true,"Description is required"],
        minlength: [1, "Discription should be at least 1 characters long"],
       
    },
    markdown:{
        type:String,
        required:[true,"Markdown Description is required"],
    }
     

  
});



const CaseStudy = mongoose.model("caseStudy", CaseStudySchema);

module.exports = CaseStudy;