const express = require("express");
const router = express.Router();
const {CreateProducts,ShowProducts,DeleteProducts,EditProducts} = require("../controller/ProductsController");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { authenticationToken } = require("../middleware/Authentication");


const storage = multer.diskStorage({

    destination:(req,file,cb)=>{
        const dir = "./assets/uploads/product/";
        fs.mkdirSync(dir,{recursive:true});
        cb(null,dir);
    },

    filename:(req,file,cb)=>{
    const uniqueSuffix = Date.now() + '-' + path.extname(file.originalname); 
    cb(null,uniqueSuffix);
    }
})

const fileFilter = (req,file,cb)=>{
    if(file.fieldname==='cover'){
        if(file.mimetype==='image/png'|| file.mimetype==="image/jpeg" || file.mimetype==="image/jpg"){
            cb(null,true);
        }
        else{
            return cb(new Error("Only png,jpg and jpeg Images are allowed to upload"));
        }
    }
}

const upload = multer({storage:storage, fileFilter:fileFilter})


router.post("/create",upload.single('cover'),CreateProducts);
router.get("/show",ShowProducts);
router.delete("/delete/:id", DeleteProducts);
router.patch("/edit/:id",upload.single('cover'),EditProducts);


module.exports = router;
