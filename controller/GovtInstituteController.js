const GovtInstitue = require("../models/GovtAndInstitutionModel");

const AllImages = async(req,res)=>{
    try
    {
       const govtInstitutedata = await GovtInstitue.find();
       res.status(200).json({status:"success",data:govtInstitutedata});
    }
    catch(error){
        res.status(404).json({status:"fail",error:error.message});
    }
}

const DeleteImage = async(req,res)=>{
    try
    {
        let {id} = req.params;
        let deleteData = await GovtInstitue.findByIdAndDelete(id);
        res.status(200).json({status:"success",data:deleteData})
    }
    catch(error){
        res.status(404).json({status:'fail',error:error.message});
    }
}

const createImage = async(req,res)=>{
    try
    {
        if(!req.file){
            res.status(404).json({error:"Image is required"});
        }
        else
        {
          const newImg = new GovtInstitue({
            logo : req.file.path,
          });

          await newImg.save();
          return res.status(200).json({
            status:"success",
            data:newImg,
          })
        }

    }
    catch(error){
        res.status(404).json({status:"fail",error:error.message});
    }
}

module.exports={
    AllImages,
    DeleteImage,
    createImage,
}