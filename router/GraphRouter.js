const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const {
  CreateGraphData,
  showGraphData,
  DeleteGraphData,
  EditGraphData,
} = require("../controller/GraphController");
const { authenticationToken } = require("../middleware/Authentication");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = "assets/uploads/Graph/";
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
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

router.post("/create", CreateGraphData);
router.put("/edit/:id", EditGraphData);
router.get("/show", showGraphData);
router.delete("/delete/:id", DeleteGraphData);

module.exports = router;
