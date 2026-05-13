import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { getSignup } from '../../Store/User/user-action';
import { toast } from 'react-toastify';
import { userAction } from '../../Store/User/user-slice';
import "../../CSS/Signup.css";

const Signup = () => {
    const navigate = useNavigate();
    const { isAuthenticated, errors } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        phoneNumber: "",
    });
    
    const { password, passwordConfirm } = user;
    
    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            toast.error("Passwords do not match");
            return;
        }
        dispatch(getSignup(user));
    };

    useEffect(() => {
        if (errors && errors.length > 0) {
            toast.error(errors);
            dispatch(userAction.clearError());
        } else if (isAuthenticated) {
            navigate("/");
            toast.success("Account created successfully");
        }
    }, [dispatch, isAuthenticated, errors, navigate]);

    const getIcon = (field) => {
        switch (field) {
            case 'name': return 'person';
            case 'email': return 'mail';
            case 'password': return 'lock';
            case 'passwordConfirm': return 'lock_reset';
            case 'phoneNumber': return 'phone_iphone';
            default: return 'edit';
        }
    };

    const getLabel = (field) => {
        switch (field) {
            case 'passwordConfirm': return 'Confirm Password';
            case 'phoneNumber': return 'Phone Number';
            default: return field.charAt(0).toUpperCase() + field.slice(1);
        }
    };

    return (
        <div className='signup-wrapper'>
            <div className='signup-container'>
                <form onSubmit={submitHandler} encType="multipart/form-data">
                    <h1>Register</h1>
                    
                    {["name", "email", "password", "passwordConfirm", "phoneNumber"].map((field) => (
                        <div className='form-group' key={field}>
                            <label htmlFor={`${field}_field`}>{getLabel(field)}</label>
                            <div className="input-wrapper">
                                <span className="material-symbols-outlined">{getIcon(field)}</span>
                                <input
                                    type={field.includes("password") ? "password" : "text"}
                                    id={`${field}_field`}
                                    name={field}
                                    placeholder={`Enter your ${getLabel(field).toLowerCase()}`}
                                    value={user[field]}
                                    onChange={onChange}
                                    required
                                />
                            </div>
                        </div>
                    ))}

                    <button id='register_button' type='submit' className='register-button'>
                        Create Account
                    </button>

                    <Link to="/login" className='login-link'>
                        Already have an account? <span>Login</span>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Signup;