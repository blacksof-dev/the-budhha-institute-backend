const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const {Allsubtabs,createAllsubtabs,EditAllsubtabs,deleteAllsubtabs} = require("../controller/subtabsController")
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = "";

    if(file.mimetype==='image/png'|| file.mimetype==="image/jpeg" || file.mimetype==="image/jpg"){
      dir = "assets/uploads/subtabsImage/";
    } 
    else {
      return cb(new Error("Only image files (JPEG, PNG, JPG) are allowed."));
    }

    fs.mkdirSync(dir, { recursive: true });

    cb(null, dir);
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});

const fileFilter = (req,file,cb)=>{
  if(file.fieldname==='images'){
      if(file.mimetype==='image/png'|| file.mimetype==="image/jpeg" || file.mimetype==="image/jpg"){
          cb(null,true);
      }
      else{
          return cb(new Error("Only png,jpg and jpeg Images are allowed to upload"));
      }
  }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.get("/show", Allsubtabs);

router.post("/create", upload.single("images"), createAllsubtabs);

router.patch("/edit/:id", upload.single("images"), EditAllsubtabs);

router.delete("/delete/:id", deleteAllsubtabs);

module.exports = router;
