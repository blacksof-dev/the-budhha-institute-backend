const express = require("express");
const router = express.Router();
const {createVideo,deleteVideo,showVideo}= require("../controller/StoryGloryController");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { authenticationToken } = require("../middleware/Authentication");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       const dir = './assets/uploads/storyGlory/';
       fs.mkdirSync(dir, { recursive: true });
       cb(null, dir);
    },
    filename: (req, file, cb) => {
       const uniqueSuffix = Date.now() + '-' + path.extname(file.originalname);
       cb(null, uniqueSuffix); 
    }
 });
 
 
 const fileFilter = (req, file, cb) => {
    
   
    if (file.fieldname === 'thumbnailImg') {
      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
      } else {
        return cb(new Error("Only image files are allowed for thumbnailImg"));
      }
    }
    
    
 };
 
 
 const upload = multer({
    storage: storage,
    fileFilter: fileFilter
 });


 
 
 

router.get("/show", showVideo);
router.post("/create",upload.single('thumbnailImg'), createVideo);
router.delete("/delete/:id", deleteVideo);



module.exports = router;













