const Errorhandler =  require("../utils/ErrorHandler");
const Product = require("../models/ProductsModel");
const path = require("path");
const CreateProducts = async(req,res)=>{
 try
 {
    const {title,city,createdBy,websiteLink} = req.body;
     if(!req.file){
       return res.status(400).json({status:"fail",error:"Something went wrong"});
     }

     if(!title || !city || !createdBy, !websiteLink){
      return res.status(400).json({status:"fail", error:"All fields are required"});
     }

     const newdata = new Product({
      cover : req.file.path,
      title,
      city,
      createdBy,
      websiteLink

     })

     await newdata.save();
     return res.status(200).json({status:"success", message:newdata});

 }
 catch(error){
    return res.status(400).json({status:"fail",error:error.message});
 }
}

const ShowProducts= async(req,res,next)=>{
  
   try
   {
      const productdata = await Product.find();
      if(!productdata){
         return next(new Errorhandler("Something went wrong",400));
      }
      else{
        return res.status(200).json({status:"success", message:productdata});
      }
   }
   catch(error){
      return res.status(404).json({status:"fail",error:error.message});
   }
}

const DeleteProducts = async(req,res,next)=>{
   try
   {
      const {id} = req.params;
      const productdata = await Product.findByIdAndDelete(id);

      if(!productdata){
         return next(new Errorhandler("Something went wrong",400));  
      }
      else{
         return res.status(200).json({status:"success",data:productdata});
      }
   }
   catch(error){
      return res.status(400).json({status:"fail",error:error.message});
   }
}


const EditProducts = async (req, res,next) => {
   try {
     const { id } = req.params;
     const { title,city,createdBy,websiteLink} = req.body;
 
    
     const cover = req.file ? req.file.path : undefined;
 
     
     const updateData = {
        title,
        city,
        createdBy,
        websiteLink
     };
 
     if (cover) {
      updateData.cover = cover;
    }
    
     const data = await Product.findByIdAndUpdate(id, updateData, { new: true });
 
     if(!data){
      return next(new Errorhandler("Something went wrong",400));  
   }
 
     return res.status(200).json({
       status: "success",
       data: data,
     });

   } 
   
   catch (error) {
     return res.status(400).json({
       status: "fail",
       error: error.message,
     });
   }
 };
 


module.exports = {
CreateProducts,
ShowProducts ,
DeleteProducts,
EditProducts,
}