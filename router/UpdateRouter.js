const express = require("express");
const router = express.Router();
const { authenticationToken } = require("../middleware/Authentication");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const {createUpdates,allupdatesData,updatesDelete,updatesEdit} = require("../controller/UpdateController");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = './assets/uploads/update/';
  
      fs.mkdirSync(dir, { recursive: true });
  
      cb(null, dir);
    },

    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + path.extname(file.originalname);
      cb(null, uniqueSuffix);
    }
  });

  const fileFilter = (req, file, cb) => {
   
    if (file.fieldname === 'cover' ) {
      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
      } else {
        return cb(new Error("Only image files are allowed for cover and logo"));
      }
    }

    if (file.fieldname === 'targetpdf') {
      if (file.mimetype === 'application/pdf') {
        cb(null, true); 
      } else {
        return cb(new Error("Only PDF files are allowed for casestudyPdf"));
      }
    }
  };

const upload = multer({ storage: storage,fileFilter:fileFilter });

const multipleUpload = upload.fields([{ name: 'cover', maxCount: 1 },{ name: 'targetpdf', maxCount: 1 }
]);

router.get("/allupdates",allupdatesData);

router.post("/create", multipleUpload,createUpdates); 

router.delete("/delete/:id",updatesDelete)

router.patch("/edit/:id",multipleUpload,updatesEdit)

module.exports = router;