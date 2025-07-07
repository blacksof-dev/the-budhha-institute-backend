const CaseStudy = require('../models/CaseStudyModel');
const path = require("path");

const allCaseStudy = async(req,res)=>{
    try
    {
       const casestudyData = await CaseStudy.find();
        return res.status(200).json({
        status:'success',
        data:casestudyData,
       })
    }
    catch(error){
        return res.status(404).json({
            status:"fail",
            error:error.message,
        })
    }
}

const createCaseStudy = async(req, res) => {
    try {
           
        const {title, subtitle, description,markdown } = req.body;

        if(!title || !subtitle || !description || !markdown){
            return res.status(400).json({status: "fail",error:"All fields are required"});
        }

        if(!req.files || !req.files['cover'] || !req.files['logo']){
            return res.status(400).json({ststus:'fail',error:"Images for logo and Video are required"});
        }

        const newCaseStudy = new CaseStudy({
            cover:req.files['cover'][0].path,
            logo:req.files['logo'][0].path,
            title,
            subtitle,
            description,
            markdown
        });

        await newCaseStudy.save(); 

        return res.status(201).json({
            status: "success",
            data: newCaseStudy
        });

    } catch (error) {
        return res.status(500).json({
            status: "fail",
            error: error.message
        });
    }
};

module.exports = { createCaseStudy };


  
const deleteCaseStudy  = async(req,res)=>{
    try
    {
       const {id} = req.params;
       const deleteddata = await CaseStudy.findByIdAndDelete(id);
        return res.status(200).json({
         status:'success',
         data:deleteddata,
        })
    }
    catch(error){
        return res.status(404).json({
            status:'fail',
            error:error.message,
        })
    }
}


const EditCaseStudy = async (req, res) => {
  try 
  {
     
     let {id}= req.params;

     const { title, subtitle, description,markdown } = req.body;

    if(!title || !subtitle || !description || !markdown){
        return res.status(500).json({status: "fail",error:"All fields are required"});
    } 

    // if(!req.files || !req.files['cover'] || !req.files['logo']){
    //     return res.status(500).json({ststus:'fail',error:"Images are required"});
    // }

    const details = {
        title,
        subtitle,
        description,
        markdown
    }
 
    if (req.files?.cover?.[0]) {
      details.cover = req.files.cover[0].path;
    }

    if (req.files?.logo?.[0]) {
      details.logo = req.files.logo[0].path;
    }
   
   

    const data = await CaseStudy.findByIdAndUpdate(id,details,{new:true});
    return res.status(200).json({status:"success" , message:data});
 
  } 
  catch (error) {
    return res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};



module.exports={
 allCaseStudy,
 createCaseStudy,
 deleteCaseStudy,
 EditCaseStudy,
}