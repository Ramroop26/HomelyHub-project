import axios from "axios";
import { setPaymentDetails } from "./payment-slice";

export const processRazorpayPayment = ({
    totalAmount,
    checkinDate,
    checkoutDate,
    propertyName,
    address,
    maximumGuest,
    nights,
    bookingId,
    propertyId,
    dispatch,
    navigate,
    userId,
    userName,
    userEmail,
    userPhone
}) => {
    return async (e) => {
        if (e && e.preventDefault) e.preventDefault();

        try {
            // 1. Clean and validate amount
            const cleanAmount = typeof totalAmount === 'string' 
                ? parseFloat(totalAmount.replace(/,/g, '')) 
                : totalAmount;

            if (isNaN(cleanAmount) || cleanAmount <= 0) {
                alert("Invalid payment amount");
                return;
            }

            // 2. Create Order on Backend
            const { data: { order } } = await axios.post("/api/v1/rent/razorpay/create-order", {
                amount: cleanAmount,
                currency: "INR",
                receipt: `receipt_${bookingId.substring(0, 10)}`
            });

            if (!order) throw new Error("Could not create Razorpay order");

            // 3. Configure Razorpay Options
            const options = {
                key: "rzp_test_dxyxSEUuzSF3bo",
                amount: order.amount,
                currency: order.currency,
                name: "HomelyHub",
                description: `Booking for ${propertyName}`,
                image: "https://t3.ftcdn.net/jpg/01/18/01/98/360_F_118019822_6CKXP6rXmVhDOzbXZlLqEM2ya4HhYzSV.jpg",
                order_id: order.id,
                handler: async function (response) {
                    try {
                        const verifyRes = await axios.post("/api/v1/rent/razorpay/verify-payment", {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            bookingDetails: {
                                property: propertyId,
                                user: userId,
                                checkinDate,
                                checkoutDate,
                                price: cleanAmount,
                                numberOfGuests: maximumGuest,
                                nights
                            }
                        });

                        if (verifyRes.data.status === "success") {
                            alert("Payment Successful! Booking Confirmed.");
                            navigate("/mybookings");
                        } else {
                            alert("Payment verification failed.");
                        }
                    } catch (error) {
                        console.error("Verification error:", error);
                        alert("Error verifying payment: " + (error.response?.data?.message || error.message));
                    }
                },
                prefill: {
                    name: userName || "Guest User",
                    email: userEmail || "guest@homelyhub.com",
                    contact: userPhone || "9999999999",
                },
                notes: {
                    address: `${address.area}, ${address.city}`,
                    property_id: propertyId
                },
                theme: {
                    color: "#00b1a5",
                },
                modal: {
                    ondismiss: function() {
                        console.log("Payment modal closed");
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                alert("Payment Failed: " + response.error.description);
            });
            rzp.open();

        } catch (error) {
            console.error("Razorpay Error:", error);
            alert("Could not initiate payment: " + (error.response?.data?.message || error.message));
        }
    };
};
