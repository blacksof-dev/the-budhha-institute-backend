const express = require("express");
const router = express.Router();
const {ShowDetails,CreateDetails,EditDetails,DeleteDetails} = require("../controller/MapDetailsController");
const { authenticationToken } = require("../middleware/Authentication");
router.get("/show",ShowDetails);

router.post("/create",CreateDetails);

router.patch("/edit/:id",EditDetails);

router.delete("/delete/:id",DeleteDetails);

module.exports = router;