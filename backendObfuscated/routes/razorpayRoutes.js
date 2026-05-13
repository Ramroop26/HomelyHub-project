const express = require("express");
const razorpayController = require("../controllers/razorpayController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/create-order", authController.protect, razorpayController.createOrder);
router.post("/verify-payment", authController.protect, razorpayController.verifyPayment);

module.exports = router;
