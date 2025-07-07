const express = require("express");
const { authenticationToken } = require("../middleware/Authentication");
const router = express.Router();
const {
  allnews,
  createArticle,
  deleteArticle,
  EditNewArticle,
} = require("../controller/newsController");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = "";

    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      dir = "assets/uploads/newsArticle/";
    } else {
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
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    return cb(new Error("Only image files (JPEG, PNG, JPG) are allowed."));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.get("/news", allnews);

router.post("/create", upload.single("cover"), createArticle);

router.patch("/edit/:id", upload.single("cover"), EditNewArticle);

router.delete("/delete/:id", deleteArticle);

module.exports = router;
