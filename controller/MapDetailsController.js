const MapDetails = require("../models/MapDetailsModel");

const ShowDetails = async(req,res)=>{
 try
 {
    const datas = await MapDetails.find();
    res.status(200).json({status:"success",data:datas});
 }
 catch(error){
    res.status(404).json({
        status:'fail',
        error:error.message,
    })
 }
}

const DeleteDetails = async(req,res)=>{
    try
    {  
        let {id} = req.params;
        const datas = await MapDetails.findByIdAndDelete(id);
       res.status(200).json({status:"success",data:datas});
    }
    catch(error){
       res.status(404).json({
           status:'fail',
           error:error.message,
       })
    }
   }

   const EditDetails = async(req,res)=>{
    try
    {  
        let {id} = req.params;
        const {digit,description} = req.body;

        const updateData = {
            digit: digit,
            description:description,
        };
        
        const datas = await MapDetails.findByIdAndUpdate(id,updateData,{new:true});
        res.status(200).json({status:"success",data:datas});
    }
    catch(error){
       res.status(404).json({
           status:'fail',
           error:error.message,
       })
    }
   }

   const CreateDetails = async(req,res)=>{
    try
    {  
        let {digit, description} = req.body;
        let newdata = new MapDetails({
           digit:digit,
           description:description,
        })

        await newdata.save();
       res.status(200).json({status:"success",data:newdata});
    }
    catch(error){
       res.status(404).json({
           status:'fail',
           error:error.message,
       })
    }
   }


module.exports = {
    ShowDetails,
    DeleteDetails,  
    CreateDetails,
    EditDetails,
}