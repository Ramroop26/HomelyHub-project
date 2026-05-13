import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../Store/User/user-action';
import { toast } from "react-toastify";
import '../CSS/Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const logout = () => {
    dispatch(Logout());
    toast.success("Logged out successfully");
    toggleSidebar();
  };

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={toggleSidebar}></div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img src="/assets/logo.png" alt="logo" />
          </div>
          <span className="material-symbols-outlined close-icon" onClick={toggleSidebar}>
            close
          </span>
        </div>

        <div className="sidebar-content">
          <ul className="sidebar-links">
            <li>
              <Link to="/" onClick={toggleSidebar}>
                <span className="material-symbols-outlined">home</span> Home
              </Link>
            </li>
            {isAuthenticated && user ? (
              <>
                <li>
                  <Link to="/profile" onClick={toggleSidebar}>
                    <span className="material-symbols-outlined">person</span> My Profile
                  </Link>
                </li>
                <li>
                  <Link to="/user/booking" onClick={toggleSidebar}>
                    <span className="material-symbols-outlined">book_online</span> My Bookings
                  </Link>
                </li>
                <li>
                  <Link to="/accommodation" onClick={toggleSidebar}>
                    <span className="material-symbols-outlined">apartment</span> My Accommodations
                  </Link>
                </li>
                <li>
                  <button className="logout-btn" onClick={logout}>
                    <span className="material-symbols-outlined">logout</span> Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" onClick={toggleSidebar}>
                  <span className="material-symbols-outlined">login</span> Login / Signup
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
