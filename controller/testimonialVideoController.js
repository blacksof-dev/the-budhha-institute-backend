const path = require("path");
const ErrorHandler = require("../utils/ErrorHandler");
const  testimonialVideo = require("../models/TestimonialVideo");

const CreatetestimonialVideo = async(req,res)=>{
    try
    {
      const {title,video,type} = req.body;
      
    

      if(!type){
        return res.status(400).json({sttaus:"fail" , message:"Type is required Image/Video want to upload"})
      }

      const newdata = new testimonialVideo({
        video,
         thumbnailImg:req.file.path,
        title,
         type
      });

      await newdata.save();

      return res.status(200).json({status:"success",message:newdata});
     
    }
    catch(error){
        return res.status(400).json({status:"fail",message:error.message});
    }
}

const ShowtestimonialVideo= async(req,res)=>{
    try
    {
       const alldata = await testimonialVideo.find();
       if(!alldata){
         return next(new ErrorHandler("Something went wrong",400));
       }

       return res.status(200).json({status:"success",message:alldata});
    }
    catch(error){
        return res.status(400).json({status:"fail",message:error.message});
    }
}

const DeletetestimonialVideo = async(req,res)=>{
    try
    {
        const {id} = req.params;
        const deleteddata = await testimonialVideo.findByIdAndDelete(id);
        if(!deleteddata){
          return next(new ErrorHandler("Something went wrong",400)); 
        }
        else{

            return res.status(200).json({status:"success",message:deleteddata}); 
        }
    }
    catch(error){
      return res.status(400).json({status:"fail",message:error.message});
    }
}

const EdittestimonialVideo = async(req,res)=>{
    try
    {
       const {id} = req.params;

       const {title,type,video} = req.body;

      //  if(!req.file['thumbnailImg']){
      //    return res.status(400).json({status:"fail",message:"Images are required"});
      //  }
       if(!type){
        return res.status(400).json({sttaus:"fail" , message:"Type is required Image/Video want to upload"})
      }

       const updatedData = {
        video,
         thumbnailImg:req.file.path,
        title,
        // type,
       }

       const data = await testimonialVideo.findByIdAndUpdate(id,updatedData,{new:true});
      return res.status(200).json({status:"success",message:data});

    }
    catch(error){
        return res.status(400).json({status:"fail",message:error.message});
    }
}

module.exports = {
    CreatetestimonialVideo, 
    ShowtestimonialVideo, 
    DeletetestimonialVideo,
    EdittestimonialVideo,
}

