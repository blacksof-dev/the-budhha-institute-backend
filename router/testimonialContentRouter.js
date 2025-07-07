const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const {showContentTestimonial,deleteContentTestimonial,editContentTestimonial,createContentTestimonial} = require("../controller/testimonialContentController");
const { authenticationToken } = require("../middleware/Authentication");
const storage = multer.diskStorage({

    destination:(req,file,cb)=>{
        const dir = "./assets/uploads/testimonialContent";
        fs.mkdirSync(dir,{recursive:true});
        cb(null,dir);
    },

    filename:(req,file,cb)=>{
        const uniqueSUffix = Date.now() + '-' +path.extname(file.originalname);
        cb(null,uniqueSUffix);
    }

})

const filter= (req,res,cb)=>{
    if(file.fieldname==='logo'){
        if(file.mimetype==='image/jpg' || file.mimetypr==='image/png' || file.mimetype==='image/jpeg'){
            cb(null, true);
        }
    }
    else{
        return cb(new Error("Only image files (PNG, JPG, JPEG) are allowed for logo."))
    }
}

const upload = multer({storage:storage,filter:filter});



router.get("/show", showContentTestimonial);
router.post("/create", upload.single('logo'), createContentTestimonial);
router.put("/edit/:id", upload.single('logo'), editContentTestimonial);
router.delete("/delete/:id", deleteContentTestimonial);

module.exports = router;
