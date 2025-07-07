const CsoModel = require("../models/CsoModel");

const AllImages = async(req,res)=>{
    try
    {
       const datas = await CsoModel.find();
       res.status(200).json({status:"success",data:datas});
    }
    catch(error){
        res.status(404).json({status:"fail",error:error.message});
    }
}

const DeleteImage = async(req,res)=>{
    try
    {
        let {id} = req.params;
        let deleteData = await CsoModel.findByIdAndDelete(id);
        res.status(200).json({status:"success",data:deleteData})
    }
    catch(error){
        res.status(404).json({status:'fail',error:error.message});
    }
}

const createImage = async (req, res) => {
    try {
      
        if (!req.file) {
            return res.status(404).json({ error: "Image is required" });
        }

        const { title } = req.body;

        const newImg = new CsoModel({
            logo: req.file.path,
            title: title,
        });

        await newImg.save();

        return res.status(200).json({
            status: "success",
            data: newImg,
        });

    } catch (error) {
        return res.status(404).json({ status: "fail", error: error.message });
    }
};


module.exports={
    AllImages,
    DeleteImage,
    createImage,
}