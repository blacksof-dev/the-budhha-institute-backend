const express = require("express");
const router = express.Router();
const {allawards,createAwards,deleteAwards,editawards} = require("../controller/AwardsController");
const fs = require('fs');
const path = require("path");
const multer = require('multer');
const { authenticationToken } = require("../middleware/Authentication");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
     let dir ='';

      if(file.mimetype==='image/jpeg'||file.mimetype==='image/png'||file.mimetype==='image/jpg'){
       dir = 'assets/uploads/awards/';
      }
      else{
        return cb(new Error('Only image files (JPEG, PNG, JPG) are allowed.'));
      }
  
      fs.mkdirSync(dir, { recursive: true });
  
      cb(null, dir);
    },

    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + path.extname(file.originalname);
      cb(null, uniqueSuffix);
    }
});
const fileFilter = (req, file, cb) => {

    if(file.mimetype==='image/jpeg'||file.mimetype==='image/png'||file.mimetype==='image/jpg'){
        cb(null, true);
    }
    else{
       return cb(new Error('Only image files (JPEG, PNG, JPG) are allowed.'));
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });



router.get("/show", allawards); 

router.post("/create" ,upload.single("cover") , createAwards);  

router.patch("/edit/:id", upload.single("cover"), editawards);  

router.delete("/delete/:id", deleteAwards); 

module.exports = router;




