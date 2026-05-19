import { createSlice } from "@reduxjs/toolkit";
const initialState ={
    bookings: [],
    bookingDetails : {},
    loading:false,
};
const bookingSlice = createSlice({
    name:"booking",
    initialState,
    reducers :{
        sendBookingRequest(state){
            state.loading =true;
            state.bookingDetails = {};
        },
        setBookings:(state,action) =>{
            state.bookings =action.payload;
             state.loading=false;
        },
        addBooking : (state,action) =>{
            state.bookings.push(action.payload);
        },
        setBookingDetails :(state,action)=>{
            state.bookingDetails=action.payload.bookings;
            state.loading = false;
        },
    },
});
export const {setBookings, addBooking, setBookingDetails, sendBookingRequest} = bookingSlice.actions;
export default bookingSlice;