const express = require("express");
const router = express.Router();
const {AllContact,StoreContact,DeleteContact,AllContactDelete} = require("../controller/ContactController");
const { authenticationToken } = require("../middleware/Authentication");

router.post("/create", StoreContact)

router.get("/show", AllContact);

router.delete("/delete/:id", DeleteContact);

router.delete("/delete", AllContactDelete);



module.exports = router;
