import React,{useState} from 'react'
import { DatePicker } from 'antd';
import { useDispatch } from 'react-redux';
import  {getAllProperties} from '../../Store/Property/property-action';
import { propertyAction } from '../../Store/Property/property-slice';

const Search = () => {
    const { RangePicker } = DatePicker;
    const [keyword,setKeyword]=useState({
        city: "",
        guests: "",
        dateIn: "",
        dateOut: ""
    });
    const [value,setValue]=useState([])
    const dispatch=useDispatch();
    function searchHandler(e){
        e.preventDefault();
        dispatch(propertyAction.updateSearchParams(keyword));
        dispatch(getAllProperties());
        setKeyword({
            city:"",
            guests:"",
            dateIn:"",
            dateOut:"",

        });
        setValue([])
    }


    function returnDates(date,dateString){
        // it setting the range value in state
        setValue([date[0],date[1]]);
        updateKeyword("dateIn",dateString[0])
        updateKeyword("dateOut",dateString[1])
    }
    // this fuction to update the 
    const updateKeyword=(field,value)=>{
        setKeyword((prevKeyword)=>({
            ...prevKeyword,
            [field]:value,

        }));
    };
    return(
    <>
    <div className='searchbar'>
      <div className='search-input-group'>
        <span className="material-symbols-outlined input-icon">location_on</span>
        <input 
          className='search' 
          id='search_destination' 
          placeholder='Search destination' 
          type='text' 
          value={keyword.city}
          onChange={(e)=>updateKeyword("city", e.target.value)}
        />
      </div>

      <div className='search-divider'></div>

      <div className='search-input-group'>
        <span className="material-symbols-outlined input-icon">calendar_month</span>
        <RangePicker
          value={value}
          format="YYYY-MM-DD"
          picker='date'
          className='date_picker'
          variant="borderless"
          disabledDate={(current) => { return current && current.isBefore(Date.now(), "day") }}
          onChange={returnDates}
        />
      </div>

      <div className='search-divider'></div>

      <div className='search-input-group'>
        <span className="material-symbols-outlined input-icon">group</span>
        <input 
          className='search' 
          id='addguest'
          placeholder='Add guests'
          type='number'
          value={keyword.guests}
          onChange={(e) => updateKeyword("guests", e.target.value)} 
        />
      </div>

      <button className="searchicon" onClick={searchHandler}>
        <span className="material-symbols-outlined">search</span>
      </button>
    </div>
    </>
    )
}

export default Search