import React,{useState} from 'react'
import {useDispatch } from 'react-redux'
import { forgotPassword } from '../../Store/User/user-action'

import "../../CSS/ForgotPassword.css"

const ForgotPassword = () => {
    const [email,setEmail]=useState("");
    const [emailSent, setEmailSent]=useState("");
    const dispatch=useDispatch();

    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(forgotPassword(email));
        setEmailSent(true);
    };

    return (
        <div className="forgot-password-wrapper">
            <div className="forgot-password-container">
                {!emailSent ? (
                    <form onSubmit={submitHandler}>
                        <h1>Forgot Password</h1>
                        <p className="text-muted text-center mb-4">Enter your email and we'll send you a link to reset your password.</p>
                        
                        <div className="form-group">
                            <label htmlFor="email_field">Registered Email</label>
                            <div className="input-wrapper">
                                <span className="material-symbols-outlined">mail</span>
                                <input 
                                    type="email"
                                    id='email_field'
                                    value={email}
                                    required
                                    onChange={(e)=>setEmail(e.target.value)}
                                    placeholder="example@gmail.com"
                                />
                            </div>
                        </div>

                        <button id="forgot_password_button" type="submit" className="password-btn">
                            Send Reset Link
                        </button>
                    </form>
                ) :(
                    <div className="success-container">
                        <span className="material-symbols-outlined text-success" style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>
                            check_circle
                        </span>
                        <h2>Email Sent!</h2>
                        <p>We've sent a password reset link to your email. Please check your inbox.</p>
                        <button className="back-btn" onClick={() => setEmailSent(false)}>
                            Back to Forgot Password
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ForgotPassword