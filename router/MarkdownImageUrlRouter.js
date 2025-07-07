const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { ImageUpload } = require("../controller/MarkdownImageUrl");
const { authenticationToken } = require("../middleware/Authentication");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = "./assets/uploads/CaseStudyMarkdown";
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    let uniqueSuffix = Date.now() + "-" + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images are allowed."), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

const multiple = upload.fields([{ name: "imageUrl", maxCount: 1 }]);

router.post("/create", multiple, ImageUpload);

module.exports = router;
