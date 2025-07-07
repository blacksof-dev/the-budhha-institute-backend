const Broucher = require("../models/BroucherModel")



const allBroucher =  async(req,res)=>{

try
    {
       const Broucherdata = await Broucher.find();

       return res.status(200).json({
        status:"success",
        data:Broucherdata
       })
    }
    catch(error){
       return res.status(404).json({
        status:"fail",
        error:error.message       
    })

    }
}


const createBroucher = async(req,res)=>{
    try{

      // console.log(req.body);
       
        if (!req.files || !req.files['cover'] ||  !req.files['targetpdf']) {
            return res.status(400).send("Images and PDF are required");
          }
      
          const coverImage = req.files['cover'][0];
          const targetpdf = req.files['targetpdf'][0];
      
          
          const { title, tag} = req.body;
      
          
          const newbroucher = new Broucher({
            cover: coverImage.path,
            title: title,
            tag: tag,
            targetpdf: targetpdf.path,
            titlebrochures: req.body.titlebrochures
          });
        
          await newbroucher.save();
            return res.status(200).json({
                status:"success",
                data:newbroucher
            })
     }
    catch(error)
    {
        return res.status(404).json({
            status:"fail",
            error:error.message
        })
    }
}


const editBroucher = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, tag,titlebrochures } = req.body;

    const cover = req.files && req.files['cover'] ? req.files['cover'][0] : undefined;
    const targetpdf = req.files && req.files['targetpdf'] ? req.files['targetpdf'][0] : undefined;

    const updateData = { title, tag,titlebrochures };

    if (cover) updateData.cover = cover.path;
    if (targetpdf) updateData.targetpdf = targetpdf.path;

    const updatedBroucher = await Broucher.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedBroucher) return res.status(404).send("Edited Broucher not found");

    return res.status(200).json({ status: "success", data: updatedBroucher });
  } catch (error) {
    return res.status(500).json({ status: "fail", error: error.message });
  }
};




const deleteBroucher = async(req,res)=>{
    try
    {
        const {id} = req.params;
        const deletedData = await Broucher.findByIdAndDelete(id);
        // console.log(deletedData);
        return res.status(200).json({
            status:"success",
            data:deletedData
        })
    }
    catch(error)
    {
        return res.status(404).json({
            status:"fail",
            error:error.message
        })
    }
}

module.exports = {
  allBroucher, 
  createBroucher,
  deleteBroucher, 
  editBroucher,
}