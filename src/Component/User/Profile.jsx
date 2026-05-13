import React from 'react';
import ProgressSteps from '../ProgressSteps';
import { Link } from 'react-router-dom';
import "../../CSS/Profile.css"
import { useSelector } from 'react-redux';
import LoadingSpinner from '../LoadindSpinner';

const Profile = () => {
const {user,loading}=useSelector((state)=>state.user);

  return (
    <>
    <ProgressSteps/>
    {loading && <LoadingSpinner/>}
    {user && !loading &&(
        <div className='profile-wrapper'>
            <div className='profile-card'>
                <div className='profile-sidebar'>
                    <div className='avatar-container'>
                        <img className='avatar-image' src={user.avatar.url} alt='avatar'/>
                    </div>
                    <h3>Welcome back,</h3>
                    <h2>{user.name.split(' ')[0]}!</h2>
                </div>
                <div className='profile-details'>
                    <div className='detail-group'>
                        <span className="material-symbols-outlined">person</span>
                        <div>
                            <label>Full Name</label>
                            <p>{user.name}</p>
                        </div>
                    </div>
                    <div className='detail-group'>
                        <span className="material-symbols-outlined">mail</span>
                        <div>
                            <label>Email Address</label>
                            <p>{user.email}</p>
                        </div>
                    </div>
                    <div className='detail-group'>
                        <span className="material-symbols-outlined">phone_iphone</span>
                        <div>
                            <label>Phone Number</label>
                            <p>{user.phoneNumber || 'Not provided'}</p>
                        </div>
                    </div>
                    <div className='profile-actions'>
                        <Link to="/editprofile" className='profile-btn primary'>
                            <span className="material-symbols-outlined">edit</span>
                            Edit Profile
                        </Link>
                        <Link to="/user/updatepassword" className='profile-btn secondary'>
                            <span className="material-symbols-outlined">lock</span>
                            Change Password
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )}
    </>
  )
}

export default Profile