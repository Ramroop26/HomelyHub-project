// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect } from "react";
import "../../CSS/Accomodation.css";
import ProgressSteps from "../ProgressSteps";

// eslint-disable-next-line no-unused-vars
import AccomodationForm from "./AccomodationForm";
import MyAccomodation from "./MyAccomdation";
// eslint-disable-next-line no-unused-vars
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { accomodationActions } from "../../Store/Accomodation/Accomodation-slice";
import { getAllAccomodation } from "../../Store/Accomodation/Accomodation-action";
import LoadingSpinner from "../LoadindSpinner"

const Accomodation = () => {
  const dispatch = useDispatch();
  const { accomodation, loading } = useSelector((state) => state.accomodation);
  console.log(accomodation.length);

  useEffect(() => {
    dispatch(getAllAccomodation());
  }, [dispatch]);

  return (
    <>
      <ProgressSteps accomodation />
      <div className="accom-container">
        <Link to="/accommodationform">
          <button className="add-new-place">+ Add new place</button>
        </Link>
        {loading && <LoadingSpinner />}
        {accomodation.length === 0 && !loading && (
          <p>Accomodation not available</p>
        )}
        {accomodation.length > 0 && !loading && (
          <MyAccomodation accomodation={accomodation} loading={loading} />
        )}
      </div>
    </>
  );
};

export default Accomodation;
