const StoryGlories = require("../models/StoryGloryModel");
const ErrorHandler = require("../utils/ErrorHandler");

const createVideo = async (req, res, next) => {
  try {   
      if (!req.file) {
          return res.status(400).send("Cover image is required.");
      }

      
      const { video, title } = req.body;

      if (!video || !title) {
          return res.status(400).json({ status: "fail", error: "Video and title are required." });
      }

      const data = new StoryGlories({
          video: video ,
          thumbnailImg: req.file.path,
          title: title,
      });

      await data.save();

      return res.status(200).json({
          status: "success",
          data: data,
      });

  } catch (error) {
      return res.status(400).json({ status: "fail", error: error.message });
  }
};

const showVideo = async(req,res)=>{
  try
  {
     const data = await StoryGlories.find();
     if(!data){
       return res.status(404).json({status:"fail",error:"Data not found"});
     }
     else{
       return res.status(200).json({status:"success",data});
     }
  }
  catch(error){
    return res.status(404).json({status:"fail",error:error.message});
 }
}

const deleteVideo= async(req,res,next)=>{
    try
    {
        const {id} = req.params;
        const deltedData = await StoryGlories.findByIdAndDelete(id);
        if(!deltedData){
          return next(new ErrorHandler("Deleted data not found",404));
        }
        else{
            return res.status(200).json({status:"success",deltedData}); 
        }
    }
    catch(error){
       return res.status(404).json({status:"fail",error:error.message});
    }
    
}

module.exports={
    createVideo,
    deleteVideo,
    showVideo
   
}