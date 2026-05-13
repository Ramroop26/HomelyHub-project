import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { userAction } from './user-slice';
import { updatePassword } from './user-action';
import "../../CSS/UpdatePassword.css";

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [CurrentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const { errors, success } = useSelector((state) => state.user);
    
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== ConfirmPassword) {
            toast.error("Passwords do not match");
            return false;
        } else {
            dispatch(updatePassword({ passwordConfirm: ConfirmPassword, password, passwordCurrent: CurrentPassword }));
        }
    }

    useEffect(() => {
        if (errors) {
            toast.error(errors);
            dispatch(userAction.clearError());
        } else if (success) {
            toast.success("Password has been updated");
            navigate("/profile");
            dispatch(userAction.getPasswordSuccess(false));
        }
    }, [errors, dispatch, navigate, success]);

    return (
        <div className="update-password-wrapper">
            <div className="update-password-container">
                <form onSubmit={submitHandler}>
                    <h1>Update Password</h1>
                    
                    <div className='form-group'>
                        <label htmlFor='new_current_password_field'>Current Password</label>
                        <div className="input-wrapper">
                            <span className="material-symbols-outlined">lock_open</span>
                            <input 
                                type='password' 
                                id='new_current_password_field' 
                                placeholder="Enter current password"
                                value={CurrentPassword} 
                                onChange={(e) => setCurrentPassword(e.target.value)} 
                                required
                            />
                        </div>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='new_password_field'>New Password</label>
                        <div className="input-wrapper">
                            <span className="material-symbols-outlined">lock</span>
                            <input 
                                type='password' 
                                id='new_password_field' 
                                placeholder="Enter new password"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required
                            />
                        </div>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='new_confirm_password_field'>Confirm New Password</label>
                        <div className="input-wrapper">
                            <span className="material-symbols-outlined">key</span>
                            <input 
                                type='password' 
                                id='new_confirm_password_field' 
                                placeholder="Confirm new password"
                                value={ConfirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                required
                            />
                        </div>
                    </div>

                    <button type='submit' className='password-btn'>
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdatePassword;