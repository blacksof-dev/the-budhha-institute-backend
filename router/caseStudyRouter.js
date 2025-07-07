const express = require("express");
const router = express.Router();
const { authenticationToken } = require("../middleware/Authentication");
const {createCaseStudy,deleteCaseStudy,allCaseStudy,EditCaseStudy} = require("../controller/CaseStudyController")
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    
    destination:(req,file,cb)=>{
        const dir = "./assets/uploads/caseStudy/";
        fs.mkdirSync(dir,{recursive:true});
        cb(null,dir);
    },
    
    filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + path.extname(file.originalname);
    cb(null, uniqueSuffix); 
    }
});

const fileFilter = (req,file,cb)=>{
  if(file.fieldname==='cover' || file.fieldname==='logo'){
    if(file.mimetype.startsWith('image/')){
        cb(null,true)
    }
    else{
        cb(new Error('Only images are allowed'));
    }
  }
}

const upload = multer({
    storage:storage,
    fileFilter:fileFilter
});

const multiuploads = upload.fields([{name:"cover",maxCount:1},{name:"logo",maxCount:1}]);



router.get("/show",allCaseStudy);

router.post("/create",multiuploads, createCaseStudy);

router.delete("/delete/:id", deleteCaseStudy);

router.patch("/edit/:id",multiuploads, EditCaseStudy);

module.exports = router;
