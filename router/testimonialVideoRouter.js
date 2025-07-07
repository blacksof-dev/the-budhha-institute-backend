const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
  CreatetestimonialVideo,
  ShowtestimonialVideo,
  DeletetestimonialVideo,
  EdittestimonialVideo,
} = require("../controller/testimonialVideoController");
const { authenticationToken } = require("../middleware/Authentication");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = "./assets/uploads/testimonialVideo";
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});

const filter = (req, file, cb) => {
  if (file.fieldname === "thumbnailImg") {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      return cb(new Error("Only image files are allowed for thumbnailImg"));
    }
  }
};

const upload = multer({
  storage: storage,
  filter: filter,
});

// const filter = (req, file, cb) => {
//   if (file.fieldname === "thumbnailImg") {
//     if (
//       file.mimetype === "image/png" ||
//       file.mimetype === "image/jpg" ||
//       file.mimetype === "image/jpeg"
//     ) {
//       cb(null, true);
//     } else {
//       return cb(new Error("Only image files are allowed for thumbnailImg"));
//     }
//   }
// };

// const upload = multer({
//   storage: storage,
//   filter: filter,
// });

router.post("/create", upload.single("thumbnailImg"), CreatetestimonialVideo);

router.get("/show", ShowtestimonialVideo);

router.delete("/delete/:id", DeletetestimonialVideo);

router.put("/edit/:id", upload.single("thumbnailImg"), EdittestimonialVideo);

module.exports = router;
