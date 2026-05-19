import React, { useEffect } from "react";
import "../../CSS/BookingDetails.css";
import PropertyImg from "../home/PropertyDetails/PropertyImg";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBookingDetails } from "../../Store/Booking/booking-action";
import LoadingSpinner from "../LoadindSpinner";

const BookingDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const { bookingDetails, loading } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(fetchBookingDetails(bookingId));
  }, [dispatch, bookingId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!bookingDetails || Object.keys(bookingDetails).length === 0) {
    return <div className="details-container">Loading...</div>;
  }

  if (!bookingDetails.property) {
    return <div className="details-container">This property details are no longer available.</div>;
  }
  return (
    <div className="details-container">
      <button onClick={() => navigate(-1)} className="back-btn" style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        background: "none",
        border: "none",
        color: "var(--text-muted)",
        fontWeight: "600",
        cursor: "pointer",
        marginBottom: "1.5rem",
        padding: "0.5rem 0",
        transition: "color 0.2s"
      }}>
        <span className="material-symbols-outlined">arrow_back</span>
        Back to Bookings
      </button>
      <p className="details-header">{bookingDetails.property.propertyName}</p>
      <h6 className="details-location">
        <span className="material-symbols-outlined">location_on</span>
        <span className="location">
          {bookingDetails.property.address.area},{" "}
          {bookingDetails.property.address.city},{" "}
          {bookingDetails.property.address.pincode},{" "}
          {bookingDetails.property.address.state}
        </span>
      </h6>
      <div className="details-information-container">
        <div className="details-information">
          <h5>Booking Information</h5>
          <section className="booking-stay-information">
            <span className="details">
              <span className="material-symbols-outlined stay-icon">
                bedtime
              </span>
              {bookingDetails.numberOfnights} nights
            </span>
            <span className="details">
              <span className="material-symbols-outlined stay-icon">
                calendar_month
              </span>
              {new Date(bookingDetails.fromDate).toLocaleDateString()}
            </span>
            <span className="material-symbols-outlined stay-icon">
              arrow_forward
            </span>
            <span className="details">
              <span className="material-symbols-outlined stay-icon">
                calendar_month
              </span>
              {new Date(bookingDetails.toDate).toLocaleDateString()}
            </span> 
          </section>
        </div>
        <div className="details-total-price-container">
          <div className="details-total-price">
            <p className="price-header">Total Price</p>
            <span className="price-in-number">
              &#8377; {bookingDetails.price}
            </span>
          </div>
          <div className="details-payment-status" style={{ marginTop: "1rem", textAlign: "center" }}>
            <span className={`payment-status ${bookingDetails.paid ? "paid" : "pending"}`} style={{
              padding: "6px 16px",
              borderRadius: "20px",
              fontSize: "0.9rem",
              fontWeight: "600",
              backgroundColor: bookingDetails.paid ? "#e6f4ea" : "#feeed8",
              color: bookingDetails.paid ? "#137333" : "#b06000",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px"
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: "1.1rem" }}>
                {bookingDetails.paid ? "check_circle" : "pending"}
              </span>
              Payment: {bookingDetails.paid ? "Paid" : "Pending"}
            </span>
          </div>
        </div>
      </div>
      <div className="propertyimg-container">
        <PropertyImg images={bookingDetails.property.images} />
      </div>
    </div>
  );
};

export default BookingDetails;
