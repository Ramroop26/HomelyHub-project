import React, { useEffect } from "react";
import "../../CSS/MyBookings.css";
import ProgressSteps from "../ProgressSteps";
import { useNavigate } from "react-router-dom";
import {  useDispatch } from "react-redux";
import { useSelector } from  "react-redux";
import {fetchUserBookings, fetchBookingDetails} from "../../Store/Booking/booking-action";
import LoadingSpinner from "../LoadindSpinner"
const MyBookings = () => {
 const dispatch = useDispatch();
 const navigate =useNavigate();
 const {bookings, loading} =useSelector((state)=>state.booking)
useEffect(()=>{
  dispatch(fetchUserBookings());
},[dispatch]);
const handleBookingClick = (bookingId)=>{
  dispatch(fetchBookingDetails(bookingId));
  navigate(`/user/booking/${bookingId}`);
};
  console.log("MyBookings Component Render: bookings =", bookings, "loading =", loading);

  return (
    <>
      <ProgressSteps />
      <div className="mybookings-list">
        {loading && <LoadingSpinner />}
        {!loading && bookings.length === 0 && (
          <div className="no-bookings" style={{
            textAlign: "center",
            padding: "3rem",
            background: "#fff",
            borderRadius: "1.5rem",
            border: "1px solid var(--border-color)",
            marginTop: "2rem"
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: "3rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
              book_online
            </span>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "0.5rem" }}>No Bookings Found</h3>
            <p style={{ color: "var(--text-muted)" }}>You haven't made any bookings or payment history yet.</p>
          </div>
        )}
        {!loading &&
          bookings.length > 0 &&
          bookings.map((booking) => (
            <div
              onClick={() => handleBookingClick(booking._id)}
              key={booking._id}
              style={{ cursor: "pointer" }}
            >
              <div className="main-container">
                <div className="mybookings-container row">
                  <div className="image-container col-lg-3 col-md-3">
                    <img
                      className="booking-img"
                      src={
                        booking.property?.images &&
                        booking.property.images.length > 0
                          ? booking.property.images[0].url
                          : undefined
                      }
                      alt="bookings"
                    />
                  </div>
                  <div className="booking-information col-lg-9 col-md-9">
                    <h6 className="hotel-name">
                      {booking.property?.propertyName}
                    </h6>
                    <div className="stay-information">
                      <span className="info">
                        <span className="material-symbols-outlined icon">
                          bedtime
                        </span>
                        {booking.numberOfnights} nights
                      </span>
                      <span className="info">
                        <span className="material-symbols-outlined icon">
                          calendar_month
                        </span>
                        {new Date(booking.fromDate).toLocaleDateString()}
                      </span>
                      <span className="material-symbols-outlined icon">
                        arrow_forward
                      </span>
                      <span className="info">
                        <span className="material-symbols-outlined icon">
                          calendar_month
                        </span>
                        {new Date(booking.toDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                      <h5 className="booking-price" style={{ borderTop: "none", paddingTop: 0, margin: 0 }}>
                        <span className="material-symbols-outlined">
                          payments
                        </span>{" "}
                        Total Price :&#8377; {booking.price}
                      </h5>
                      <span className={`payment-status ${booking.paid ? "paid" : "pending"}`} style={{
                        padding: "4px 12px",
                        borderRadius: "12px",
                        fontSize: "0.85rem",
                        fontWeight: "600",
                        backgroundColor: booking.paid ? "#e6f4ea" : "#feeed8",
                        color: booking.paid ? "#137333" : "#b06000",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px"
                      }}>
                        <span className="material-symbols-outlined" style={{ fontSize: "1rem" }}>
                          {booking.paid ? "check_circle" : "pending"}
                        </span>
                        {booking.paid ? "Paid" : "Pending"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default MyBookings;
