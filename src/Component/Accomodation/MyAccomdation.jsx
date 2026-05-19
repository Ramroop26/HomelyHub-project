import React from "react";

const MyAccomodation = ({ accomodation }) => {
  return (
    <>
      {accomodation.map((item) => (
        <div className="main-container" key={item._id}>
          <div className="myaccomodation-container row">
            <div className="myaccomodation-image-container col-lg-3 col-md-3">
              <img
                className="myaccomodation-img"
                src={
                  item.images && item.images.length > 0
                    ? item.images[0].url
                    : undefined
                }
                alt="myaccomdation"
              />
            </div>
            <div className="myaccomodation-information col-lg-9 col-md-9">
              <h5 className="myaccomodation-property-name">
                {item.propertyName}
              </h5>
              <div className="stay-information">
                <span className="info">
                  <span className="material-symbols-outlined">schedule</span>
                  CheckIn Time: {item.checkInTime}
                </span>
                <span className="material-symbols-outlined icon">
                  arrow_forward
                </span>
                <span className="info">
                  <span className="material-symbols-outlined">schedule</span>
                  CheckOut Time: {item.checkOutTime}
                </span>
              </div>
              <p className="myaccomodation-address">
                Address : {item.address?.area}, {item.address?.city}, {item.address?.state}, {item.address?.pincode}
              </p>
              <p className="myaccomodation-guest">
                Max no of guest :{item.maximumGuest}
              </p>
              <h6 className="myaccomodation-price">
                <span className="material-symbols-outlined">payments</span>
                Price Per Night :&#8377; {item.price}
              </h6>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MyAccomodation;
