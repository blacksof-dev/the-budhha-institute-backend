const Update = require("../models/UpdateModel");
const path = require("path");
const Errorhandler = require("../utils/ErrorHandler")
const allupdatesData = async(req,res,next)=>{
    try
    {
        const allupdateData = await  Update.find();

        if(!allupdateData){
            return next(new Errorhandler("Something went wrong",400));
        }

        return res.status(200).json({
            status:"success",
            data:allupdateData,
        })
    }
    catch(error){
        return res.status(400).json({
            status:"fail",
            error:error.message
        });
    }
}

const createUpdates = async (req, res) => {
    try { 

        if (!req.files || !req.files['cover'] || !req.files['targetpdf']) {
            return res.status(400).send("Images and PDF are required");
        }

        const cover = req.files['cover'][0];
        const pdfFile = req.files['targetpdf'][0];
        
        const {tag,title,description} = req.body;

        const updateData = new Update({
            cover:cover.path, 
            tag: tag,
            title,
            description,
            targetpdf: pdfFile.path,
        });

      
        await updateData.save();

        res.status(201).json({
            status: "success",
            data: updateData,
        });

    } 
    catch (error) {
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
};


const updatesDelete = async(req,res,next)=>{
    try
    {
     let {id} = req.params;
       const deletedData = await Update.findByIdAndDelete(id);

       if(!deletedData){
        return next(new Errorhandler("Something went wrong",400));
     }
       res.status(200).json({status:"success",data:deletedData});
    }
    catch(error){
        res.status(400).json({status:'fail',error:error.message});
    }
}

const updatesEdit = async(req,res)=>{
    try
    {
         let {id} = req.params;
         const{tag,title,description}= req.body;
         const coverFile = req.files && req.files['cover'] ? req.files['cover'][0] : undefined;
         const pdfFile = req.files && req.files['targetpdf'] ? req.files['targetpdf'][0] : undefined;

         const updatedData = {
            tag:tag,
            title:title,
            description:description,
         };

         if (coverFile) updatedData.cover = path.join('assets/uploads/update/', coverFile.filename);
        if (pdfFile) updatedData.targetpdf = path.join('assets/uploads/update/', pdfFile.filename);

         const updates = await Update.findByIdAndUpdate(id,updatedData,{
            new:true,
         })

         if(!updates){
            return res.status(400).send("Not Found");
         }

         return res.status(200).json({status:'success',data:updates});
        
    }
    catch(error){
        res.status(400).json({status:'fail', error:error.message})
    }
}

module.exports = {
    createUpdates,
    allupdatesData,
    updatesDelete,
    updatesEdit,
}