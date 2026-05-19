import axios from "axios";
import { setBookings, addBooking, setBookingDetails, sendBookingRequest } from "./booking-slice";
export const createBooking = (bookingDate)=>async(dispatch)=>{
    try{
        const response = await axios.post(
            "/api/v1/rent/user/booking/new",
            bookingDate);
        dispatch(addBooking(response.data.data.booking));
    }catch(error){
        console.error("Error creating booking",error);
    }
};
export const fetchBookingDetails = (bookingId)=> async(dispatch)=>{
try{
    dispatch(sendBookingRequest());
    const response = await axios.get(`/api/v1/rent/user/booking/${bookingId}`);
    dispatch(setBookingDetails(response.data.data));
}catch(error){
    console.error("Error Fetching booking details",error);
}
}
export const fetchUserBookings = ()=> async(dispatch)=>{
    try{
        dispatch(sendBookingRequest());
        console.log("Fetching user bookings from API...");
        const response = await axios.get("/api/v1/rent/user/booking");
        console.log("Fetch user bookings response:", response.data);
        dispatch(setBookings(response.data.data.bookings))
    }catch(error){
        console.error("Error Fetching bookings",error);
    }
    }