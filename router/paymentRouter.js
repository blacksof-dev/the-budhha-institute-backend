const express = require("express");
const router = express.Router();
const {CreateOrder,VerifyOrder} = require("../controller/PaymentController");

router.post("/order",CreateOrder);
router.post("/verify",VerifyOrder);

module.exports = router;