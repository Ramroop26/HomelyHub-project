import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { processRazorpayPayment } from "../../Store/Payment/payment-action";
import "../../CSS/Payment.css";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookingId, propertyId } = useParams();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const {
    checkinDate,
    checkoutDate,
    totalPrice,
    propertyName,
    address,
    maximumGuest,
    nights,
  } = useSelector((state) => state.payment.paymentDetails);

  const handleSubmit = (e) => {
    processRazorpayPayment({
      totalAmount: totalPrice,
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
      userId: user._id,
      userName: user.name,
      userEmail: user.email,
      userPhone: user.phoneNumber,
    })(e);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="payment-wrapper">
      <div className="payment-form-container">
        {isAuthenticated && (
          <form onSubmit={handleSubmit}>
            <h2>Complete Payment</h2>
            <div className="payment-details-summary">
              <p><strong>Property:</strong> {propertyName}</p>
              <p><strong>Total Amount:</strong> ₹{totalPrice}</p>
              <p><strong>Nights:</strong> {nights}</p>
            </div>
            
            <div className="payment-method-notice">
              <p>Secure payment via Razorpay</p>
            </div>

            <button type="submit" className="paymentbtn">
              Pay ₹{totalPrice}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Payment;
