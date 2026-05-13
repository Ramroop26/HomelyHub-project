const Razorpay = require("razorpay");
const crypto = require("crypto");
const Booking = require("../Models/bookingModel");
const Property = require("../Models/propertyModel");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || process.env["razorpay.key_id"],
  key_secret: process.env.RAZORPAY_KEY_SECRET || process.env["razorpay.key_secret"],
});

exports.createOrder = async (req, res) => {
  const { amount, currency = "INR", receipt } = req.body;

  try {
    const finalAmount = Math.round(Number(amount) * 100);
    
    // Safety check: Razorpay test mode usually has a limit (e.g., 5,00,000 INR)
    if (finalAmount > 50000000) { 
      return res.status(400).json({ error: "Amount exceeds maximum test limit (5 Lakhs INR). Please try a smaller duration or property." });
    }

    if (finalAmount <= 0) {
      return res.status(400).json({ error: "Invalid amount. Must be greater than 0." });
    }

    const options = {
      amount: finalAmount, // Amount in paise
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).send("Order creation failed");
    }

    res.json(order);
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    bookingDetails,
  } = req.body;

  const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || process.env["razorpay.key_secret"]);
  shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = shasum.digest("hex");

  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  try {
    // Payment is successful, now create the booking
    const newBooking = await Booking.create({
      ...bookingDetails,
      paymentInfo: {
        id: razorpay_payment_id,
        status: "succeeded",
      },
      paidAt: Date.now(),
    });

    // Update property bookings
    await Property.findByIdAndUpdate(bookingDetails.property, {
      $push: {
        currentBookings: {
          bookingId: newBooking._id,
          fromDate: bookingDetails.fromDate,
          toDate: bookingDetails.toDate,
          userId: bookingDetails.user,
        },
      },
    });

    res.json({
      msg: "success",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      booking: newBooking,
    });
  } catch (error) {
    console.error("Booking Error after Razorpay:", error);
    res.status(500).json({ error: error.message });
  }
};
