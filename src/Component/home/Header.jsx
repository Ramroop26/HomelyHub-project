import React, { useState } from 'react'
import Search from './Search'
import Filter from './Filter'
import { Link ,useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { propertyAction } from '../../Store/Property/property-slice'
import { getAllProperties } from '../../Store/Property/property-action'
import { Logout } from '../../Store/User/user-action'
import {toast} from "react-toastify";
import Sidebar from '../Sidebar';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const {isAuthenticated,user}=useSelector((state)=>state.user);
  const navigate=useNavigate();
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const logout=()=>{
    dispatch(Logout());
    toast.success("user has been logged out successfully");
    navigate("/");
  }

  const allProperties = () => {
    dispatch(propertyAction.updateSearchParams({}))
    dispatch(getAllProperties());
  }
  return (
    <>
      <nav className='header sticky-top'>
        <div className='header-left'>
          <div className="hamburger" onClick={toggleSidebar}>
            <span className="material-symbols-outlined">menu</span>
          </div>

          <Link to="/" className='logo-link'>
            <img src="/assets/logo.png" onClick={allProperties} alt='logo' className='logo' />
          </Link>
        </div>

        <div className='search_filter'>
          <Search />
          <Filter />
          <div className="reset-container" onClick={allProperties}>
            <span className="material-symbols-outlined c_ptr">
              restart_alt
            </span>
            <span className="resetLogo">Reset Filter</span>
          </div>
        </div>

        <div className="nav-user-info">
          {!isAuthenticated && !user && (
            <Link to="/login" className='login-link'>
              <span className="material-symbols-outlined web_logo c_ptr">
                account_circle
              </span>
            </Link>
          )}
          {isAuthenticated && user && (
            <div className='dropdown'>
              <div className='dropdown-toggle user-trigger' id='dropdownMenuLink' data-bs-toggle="dropdown" aria-expanded="false">
                {user.avatar && user.avatar.url ? (
                  <img src={user.avatar.url} className='user-img' alt='user'/>
                ) : (
                  <span className="material-symbols-outlined web_logo">
                    account_circle
                  </span>
                )}
              </div>
              <ul className='dropdown-menu dropdown-menu-end' aria-labelledby='dropdownMenuLink'>
                <li>
                  <Link className='dropdown-item' to="/profile">
                    <span className="material-symbols-outlined">person</span>
                    My Account
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className='dropdown-item logout-item' type='button' onClick={logout}>
                    <span className="material-symbols-outlined">logout</span>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
}

export default Header
