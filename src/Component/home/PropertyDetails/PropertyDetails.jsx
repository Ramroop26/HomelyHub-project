import { useEffect } from "react"
import React from 'react'
import { useDispatch,useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { getPropertyDetails } from "../../../Store/PropertyDetails/propertyDetails-action";
import PropertyImg from "./PropertyImg";
import "../../../CSS/PropertyDetails.css"
import PropertyAmenities from "./PropertyAmenities";
import BookingForm from "./BookingForm";
import MapComponent from "./MapComponent";

function PropertyDetails() {
    const dispatch= useDispatch();
    const {id}= useParams();
    const {propertydetails} = useSelector((state)=>state.propertydetails);
    // console.log(propertydetails)

    useEffect(()=>{
        dispatch(getPropertyDetails(id));

    },[dispatch,id]);
    const{extraInfo, propertyName,address,images,description,maximumGuest,amenities,price,currentBookings}=propertydetails;
    
  return (
    <div className="property-container">
        {propertyName && (
            <>
                <p className="property-header">{propertyName}</p>
                <h6 className="property-location">
                <span className="material-symbols-outlined">
                    home
                </span>
                <span className="location">{`${address.area},${address.city},${address.pincode},${address.state}`}</span>
                </h6>
                <PropertyImg images={images}/>
                <div className='middle-container'>
                    <div className="des-and-amenities">
                        <h2 className="property-description-header">Description</h2>
                        <p className="property-description">
                            {description}
                        </p>
                        <div className="max-guests-info">
                            <span className="material-symbols-outlined">group</span>
                            Max Number of Guests: <strong>{maximumGuest}</strong>
                        </div>
                        <hr/>
                        <PropertyAmenities amenities={amenities}/>
                    </div>
                    <div className="property-payment">
                        <BookingForm propertyId={id} price={price} propertyName={propertyName} address={address} maximumGuest={maximumGuest} currentBookings={currentBookings}/>
                    </div>
                </div>
                <hr/>
                <div className="property-map">
                    <h2 className="map-header">Where you will be</h2>
                    <div className="map-image-exinfo-container">
                        <div className="map-image-container">
                            <MapComponent address={address}/>
                        </div>
                        <div className="extra-info">
                            <h2 className="extra-heading">Extra Info</h2>
                            <p className="extra-description">{extraInfo}</p>
                        </div>
                    </div>
                </div>
            </>
        )}
    </div>
  )
}

export default PropertyDetails