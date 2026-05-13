import React from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { processPayment} from "../../Store/Payment/payment-action";
import "../../CSS/Payment.css";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookingId, propertyId } = useParams();
  const { isAuthenticated } = useSelector((state) => state.user);

  const {
    checkinDate,
    checkoutDate,
    totalPrice,
    propertyName,
    address,
    maximumGuest,
    nights,
  } = useSelector((state) => state.payment.paymentDetails);

  const handleSubmit = processPayment({
    totalAmount: totalPrice,
    stripe,
    elements,
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
  });

  const elementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#111827",
        "::placeholder": {
          color: "#9ca3af",
        },
      },
      invalid: {
        color: "#ef4444",
      },
    },
  };

  return (
    <div className="payment-wrapper">
      <div className="payment-form-container">
        {isAuthenticated ? (
          <form onSubmit={handleSubmit}>
            <h2>Complete Payment</h2>
            <div className="form-group">
              <label htmlFor="card_num_field">Card Number</label>
              <div className="stripe-element-container">
                <CardNumberElement
                  id="card_num_field"
                  options={elementOptions}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <div className="stripe-element-container">
                <CardExpiryElement
                  id="card_exp_field"
                  options={elementOptions}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <div className="stripe-element-container">
                <CardCvcElement
                  id="card_cvc_field"
                  options={elementOptions}
                />
              </div>
            </div>
            <button type="submit" className="paymentbtn">
              Pay ₹{totalPrice}
            </button>
          </form>
        ) : (
          <div>{navigate("/login")}</div>
        )}
      </div>
    </div>
  );
};

export default Payment;
