const express = require("express");
const router = express.Router();
const {StoreAddress,ShowAllAddress,DeleteAllAddress,EditAllAddress} = require("../controller/AddressController");
const { authenticationToken } = require("../middleware/Authentication");

router.post("/create" , StoreAddress);

router.get("/show",ShowAllAddress);

router.patch("/edit/:id" , EditAllAddress);


router.delete("/delete/:id" ,DeleteAllAddress);


module.exports = router;
