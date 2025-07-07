const express = require("express");
const router = express.Router();
const {CreateNewsLetter,ShowNewsLetter,DeleteNewsLetter,DeleteAllNewsLetter} = require("../controller/NewsLetterController")
const { authenticationToken } = require("../middleware/Authentication");
router.post("/create",CreateNewsLetter);
router.get("/show",ShowNewsLetter);
router.delete("/delete/:id", DeleteNewsLetter);
router.delete("/delete",DeleteAllNewsLetter);
module.exports = router;