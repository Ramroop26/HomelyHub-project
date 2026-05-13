import React,{Fragment,useEffect,useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { toast } from 'react-toastify'
import { getLogIn } from '../../Store/User/user-action'
import { userAction } from '../../Store/User/user-slice'
import LoadingSpinner from '../LoadindSpinner'
import "../../CSS/Login.css"
//  import useSelection from 'antd/es/table/hooks/useSelection'
const Login = () => {
    const navigate =useNavigate();
    const dispatch =useDispatch();
    const [email,setEmail]=useState("");
    const [password, setPassword]=useState("");
    const{isAuthenticated,errors,loading} =useSelector(
        (state)=>state.user
    )
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(getLogIn({email,password}))
    };
    useEffect(()=>{
        if(errors && errors.length>0){
            toast.error(errors);
            dispatch(userAction.clearError());
        }
        else if(isAuthenticated){

            navigate("/")
            toast.success("User has logged successfully");
        }
        console.log(isAuthenticated);
    },[isAuthenticated,errors,navigate, dispatch]);
  return (
    <Fragment>
        <div className='login-wrapper'>
            {loading && <LoadingSpinner/>}
            {!loading && (
                <div className='login-container'>
                    <form onSubmit={submitHandler}>
                        <h1>Login</h1>
                        
                        <div className='form-group'>
                            <label htmlFor='email_field'>Email Address</label>
                            <div className="input-wrapper">
                                <span className="material-symbols-outlined">mail</span>
                                <input 
                                    type='email' 
                                    id='email_field' 
                                    placeholder="Enter your email"
                                    value={email} 
                                    onChange={(e)=>setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className='form-group'>
                            <label htmlFor='password_field'>Password</label>
                            <div className="input-wrapper">
                                <span className="material-symbols-outlined">lock</span>
                                <input 
                                    type='password' 
                                    id='password_field' 
                                    placeholder="Enter your password"
                                    value={password} 
                                    onChange={(e)=>setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <Link to="/user/forgotpassword" title="Click to reset password" className="forgot-password-link">
                            Forgot Password?
                        </Link>

                        <button id='login_button' type='submit' className='login-button'>
                            Login
                        </button>

                        <Link to="/signup" className='new-user-link'>
                            Don't have an account? <span>Create one</span>
                        </Link>
                    </form>
                </div>
            )}
        </div>
    </Fragment>
  )
}

export default Login;