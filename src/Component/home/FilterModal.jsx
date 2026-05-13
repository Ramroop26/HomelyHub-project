import React,{useEffect,useState} from 'react'
import PropTypes from 'prop-types' // for using of type checking
import "../../CSS/FilterModal.css"
import "react-input-range/lib/css/index.css";
import InputRange from "react-input-range";
function FilterModal({selectedFilters,onFilterChange,onClose}) {
    const [priceRange,setPriceRange]=useState({
        min: selectedFilters.priceRange?.min || 600,
        max: selectedFilters.priceRange?.max || 3000
    });
    const [propertyType, setPropertyType]=useState(
        selectedFilters.propertyType || ""
    )
    const[roomType,setRoomType] =useState(selectedFilters.roomType || "");
    const[amenities,setAmenities]=useState(selectedFilters.amenities || []);
    //useEffect hook 
    useEffect(()=>{
        setPriceRange({
            min:selectedFilters.priceRange?.min || 600,
            max:selectedFilters.priceRange?.max || 30000,
        });
        setPropertyType(selectedFilters.propertyType ||"");
        setRoomType(selectedFilters.roomType || "");
        setAmenities(selectedFilters.amenities || []);

    },[selectedFilters]);
    // fuction to handle changes in price range
    const handlePriceRangeChange=(value)=>{
        setPriceRange(value)//it will update the price range state
    }
    const handleMinInputChange =(e)=>{
        const minValue= parseInt(e.target.value,10);
        setPriceRange((prev)=>({...prev,min:minValue}))
    }
    const handleMaxInputChange = (e)=>{
        const maxValue =parseInt(e.target.value,10)
        setPriceRange((prev)=>({...prev,max:maxValue}))
    
    }
    const handleFilterChange=()=>{
        onFilterChange("minPrice", priceRange.min)
        onFilterChange("maxPrice", priceRange.max)
        onFilterChange("propertyType",propertyType)
        onFilterChange("amenities",amenities)
        onClose();
    }
    const propertyTypeOption=[{
        value:"House",
        label: "House",
        icon:"home"
    },
    {value:"Flat", label:"Flat", icon:"apartment"},
    {
        value:"Guest House",
        label: "Guest House",
        icon:"hotel"
    },
    {value:"Hotel", label:"Hotel", icon:"meeting_room"}
    ];

    const roomTypeOption=[
        {
        value:"Entire Room",
        label:"Entire Room",
        icon: "hotel"
        },
        {
        value:"Room",
        label:"Room",
        icon: "meeting_room"
        },
        {
        value:"AnyType",
        label:"AnyType",
        icon: "apartment"
        },
    ]
// 
    const amenitiesTypeOption=[
        {
            value:"Wifi",
            label:"Wifi",
            icon:"wifi"
        },
        {
            value:"Kitchen",
            label:"Kitchen",
            icon:"kitchen"
        },
        {
            value:"Ac",
            label:"AC",
            icon:"ac_unit"
        },
        
        {
            value:"Washing Machine",
            label:"Washing Machine",
            icon:"local_laundry_service"
        },
        {
            value:"Tv",
            label:"Tv",
            icon:"tv"
        },
        {
            value:"Pool",
            label:"Pool",
            icon:"pool"
        },
        {
            value:"Free Parking",
            label:"Free Parking",
            icon:"local_parking"
        },
    ]
    // reset the filters
    const handleClearFilters=()=>{
        setPriceRange({min:600,max:30000})
        setPropertyType("")
        setRoomType("")
        setAmenities([])
    }
    const handleAmenityChange=(selectedAmenity)=>{
        setAmenities((prevAmenities)=>prevAmenities.includes(selectedAmenity)?prevAmenities.filter((item)=>item!==selectedAmenity):[...prevAmenities,selectedAmenity])
    }
    const handlePropertyTypeChange=(selectedType)=>{
        setPropertyType((prevType)=>
            prevType===selectedType?"":selectedType)
        
    }
    const handleRoomTypeChange=(selectedType)=>{
        setRoomType((prevType)=>
            prevType===selectedType?"":selectedType)
        
    }
    
    return (
    <div className='modal-backdrop'>
        <div className='modal-content'>
            <div className="modal-header">
                <h4>Filters</h4>
                <button className='close-button' onClick={onClose}>
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>
            
            <div className='modal-filters-container'>
                {/* Price Range */}
                <div className='filter-section'>
                    <h5 className="section-title">Price Range</h5>
                    <p className="section-subtitle">Nightly prices before fees and taxes</p>
                    <div className="range-slider-wrapper">
                        <InputRange 
                            minValue={600} 
                            maxValue={30000} 
                            value={priceRange} 
                            onChange={handlePriceRangeChange} 
                        />
                    </div>
                    <div className='range-inputs'>
                        <div className="input-group">
                            <label>Minimum</label>
                            <div className="input-with-symbol">
                                <span>₹</span>
                                <input type='number' value={priceRange.min} onChange={handleMinInputChange}/>
                            </div>
                        </div>
                        <div className="input-divider"></div>
                        <div className="input-group">
                            <label>Maximum</label>
                            <div className="input-with-symbol">
                                <span>₹</span>
                                <input type='number' value={priceRange.max} onChange={handleMaxInputChange}/>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Property Type */}
                <div className='filter-section'>
                    <h5 className="section-title">Property Type</h5>
                    <div className='options-grid'>
                        {propertyTypeOption.map((options)=>(
                            <div key={options.value}
                                className={`option-card ${propertyType===options.value ? "selected" : ""}`}
                                onClick={()=>handlePropertyTypeChange(options.value)}>
                                <span className='material-symbols-outlined'>{options.icon}</span>
                                <span className="option-label">{options.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Room Type */}
                <div className='filter-section'>
                    <h5 className="section-title">Room Type</h5>
                    <div className='options-grid'>
                        {roomTypeOption.map((options)=>(
                            <div key={options.value}
                                className={`option-card ${roomType===options.value ? "selected" : ""}`}
                                onClick={()=>handleRoomTypeChange(options.value)}>
                                <span className='material-symbols-outlined'>{options.icon}</span>
                                <span className="option-label">{options.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Amenities */}
                <div className='filter-section'>
                    <h5 className="section-title">Amenities</h5>
                    <div className='amenities-grid'>
                        {amenitiesTypeOption.map((options)=>(
                            <div key={options.value} className="amenity-item" onClick={()=>handleAmenityChange(options.value)}>
                                <div className={`custom-checkbox ${amenities.includes(options.value) ? "checked" : ""}`}>
                                    {amenities.includes(options.value) && <span className="material-symbols-outlined">check</span>}
                                </div>
                                <span className='material-symbols-outlined amenity-icon'>{options.icon}</span>
                                <span className="amenity-label">{options.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='modal-footer'>
                <button className='clear-button' onClick={handleClearFilters}>Clear all</button>
                <button className='apply-button' onClick={handleFilterChange}>Show Places</button>
            </div>
        </div>
    </div>
  )
}
FilterModal.propTypes={
    selectedFilters: PropTypes.func.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};

export default FilterModal