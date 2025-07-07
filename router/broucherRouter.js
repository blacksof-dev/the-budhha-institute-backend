const express = require("express");
const router = express.Router();
const {allBroucher,createBroucher,deleteBroucher,editBroucher} = require("../controller/BroucherController");
const fs = require('fs');
const path = require("path");
const { authenticationToken } = require("../middleware/Authentication");
const multer = require('multer');

 const storage = multer.diskStorage({

     destination: (req, file, cb) => {
       const dir = './assets/uploads/broucher/';
   
       fs.mkdirSync(dir, { recursive: true });
   
       cb(null, dir);
     },
 
     filename: (req, file, cb) => {
       const uniqueSuffix = Date.now() + '-' + path.extname(file.originalname);
       cb(null, uniqueSuffix);
     }
   });

  const fileFilter = (req, file, cb) => {
   
    if (file.fieldname === 'cover') {
      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
         cb(null, true);
      }
       else {
        return cb(new Error("Only image files are allowed for cover."));
      }
    }

    if (file.fieldname === 'targetpdf') {
      if (file.mimetype === 'application/pdf') {
        cb(null, true); 
      } else {
        return cb(new Error("Only PDF files are allowed for targetpdf"));
      }
    }
  };;

const upload = multer({ storage: storage, fileFilter: fileFilter });
const multipleUpload = upload.fields([{ name: 'cover', maxCount: 1 },{ name: 'targetpdf', maxCount: 1 }])



router.get("/allbroucher", allBroucher);

router.post("/create", multipleUpload, createBroucher);


router.patch("/edit/:id", multipleUpload, editBroucher)

router.delete("/delete/:id", deleteBroucher);

module.exports = router;


