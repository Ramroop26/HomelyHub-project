import React, {useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../Store/User/user-action'
import { useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"
import "../../CSS/EditProfile.css";

const EditProfile = () => {
    const {user}=useSelector((state)=>state.user);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber]=useState("");
    const [avatarPreview, setAvatarPreview]=useState("/assets/avatar.png")
    const [avatar,setAvatar]=useState("");

    useEffect(()=>{
        if(user){
            setName(user.name || "");
            setPhoneNumber(user.phoneNumber || "");
            setAvatarPreview(user.avatar?.url || "/assets/avatar.png")
            setAvatar(user.avatar?.url || "");
        }
    },[user])

    const handleupdate=(e)=>{
        e.preventDefault();
        dispatch(updateUser({name, phoneNumber,avatar}));
        navigate("/profile")
        toast.success("Profile updated successfully")
    }

    const handleAvatarChange=(e)=>{
        const file =e.target.files[0];
        const reader =new FileReader();
        reader.onload=()=>{
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
        }
        reader.readAsDataURL(file)
    }

    return (
        <div className='edit-profile-wrapper'>
            {user && (
                <div className='edit-profile-container'>
                    <form onSubmit={handleupdate} encType='multipart/form-data'>
                        <h1>Update Profile</h1>
                        
                        <div className='form-group'>
                            <label htmlFor='name_field'>Full Name</label>
                            <div className="input-wrapper">
                                <span className="material-symbols-outlined">person</span>
                                <input 
                                    type='text' 
                                    id='name_field' 
                                    value={name} 
                                    onChange={(e)=> setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className='form-group'>
                            <label htmlFor='phonenumber_field'>Phone Number</label>
                            <div className="input-wrapper">
                                <span className="material-symbols-outlined">phone_iphone</span>
                                <input 
                                    type='text' 
                                    id='phonenumber_field' 
                                    value={phoneNumber} 
                                    onChange={(e)=> setPhoneNumber(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className='form-group'>
                            <label>Profile Avatar</label>
                            <div className='avatar-section'>
                                <div className='avatar-preview-container'>
                                    <img src={avatarPreview} alt="Avatar Preview"/>
                                </div>
                                <div className='upload-box'>
                                    <input 
                                        type='file' 
                                        name='avatar' 
                                        id='avatar_update' 
                                        className="hidden"
                                        accept='image/*' 
                                        onChange={handleAvatarChange}
                                    />
                                    <label className='custom-file-upload' htmlFor='avatar_update'>
                                        <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: '8px' }}>upload</span>
                                        Choose New Avatar
                                    </label>
                                    <span className='file-note'>Max file size: 20KB</span>
                                </div>
                            </div>
                        </div>

                        <button type='submit' className='update-btn'>Save Changes</button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default EditProfile