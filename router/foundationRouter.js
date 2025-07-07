const express = require("express");
const router = express.Router();
const {AllImages,DeleteImage,createImage} = require("../controller/FoundationController");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { authenticationToken } = require("../middleware/Authentication");
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        let dir = '';
        if(file.mimetype==='image/jpeg'||file.mimetype==='image/png'||file.mimetype==='image/jpg'||file.mimetype==='image/svg+xml'){
            dir = 'assets/uploads/foundation/';
        }
        else
        {
             return cb(new Error('Only image files (JPEG, PNG, JPG,Svg) are allowed.'));
        }

        fs.mkdirSync(dir, { recursive: true });

        cb(null, dir);
    },

    filename:(req,file,cb)=>{
       const uniqueSuffix = Date.now() + '-' + path.extname(file.originalname);
       cb(null, uniqueSuffix);
    }
})

const fileFilter = (req, file, cb) => {

    if(file.mimetype==='image/jpeg'||file.mimetype==='image/png'||file.mimetype==='image/jpg'||file.mimetype==='image/svg+xml'){
        cb(null, true);
    }
    else{
       return cb(new Error('Only image files (JPEG, PNG, JPG, Svg) are allowed.'));
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.get("/show",AllImages);

router.post("/create",upload.single('logo'),createImage);

router.delete("/delete/:id",DeleteImage);

module.exports = router;