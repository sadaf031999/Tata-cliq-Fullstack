import React, { useState } from 'react';
import loginIcons from '../assets/image.png';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
// import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';

import './SignUp.css';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) =>{
    const { name , value } = e.target

    setData((preve)=>{
        return{
            ...preve,
            [name] : value
        }
    })
}

  const handleUploadPic = async (e) => {
   // const file = e.target.files[0];

    /* const imagePic = await imageTobase64(file);

    setData((prev) => ({
      ...prev,
      profilePic: imagePic,
    })); */
  };

  const handleSubmit = async(e) =>{
    e.preventDefault()

    if(data.password === data.confirmPassword){
      console.log("SummaryApi.signUP.url",SummaryApi.signUP.url)

      const dataResponse = await fetch(SummaryApi.signUP.url,{
          method : SummaryApi.signUP.method,
          headers : {
              "content-type" : "application/json"
          },
          body : JSON.stringify(data)
        })
  
        const dataApi = await dataResponse.json()
        console.log("dataApi",dataApi)

        if(dataApi.success){
          //toast.success(dataApi.message)
          alert(dataApi.message);
          navigate("/SignIn")
        }

        if(dataApi.error){
          alert(dataApi.message);
        }
  
    }else{
      alert("Please check password and confirm password")
      
    }

}

  return (
    <section id="signup">
      <div className="signup-container">
        <div className="signup-box">
          <div className="profile-pic-wrapper">
            <div className="profile-pic">
              <img src={data.profilePic || loginIcons} alt="login icon" />
            </div>
            <form>
              <label className="upload-label">
                <div className="upload-text">Upload Photo</div>
                <input type="file" className="hidden-input" onChange={handleUploadPic} />
              </label>
            </form>
          </div>

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email:</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password:</label>
              <div className="input-wrapper password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={data.password}
                  name="password"
                  onChange={handleOnChange}
                  required
                />
                <div
                  className="icon-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Confirm Password:</label>
              <div className="input-wrapper password-field">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter confirm password"
                  value={data.confirmPassword}
                  name="confirmPassword"
                  onChange={handleOnChange}
                  required
                />
                <div
                  className="icon-toggle"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <button type="submit" className="submit-button">
              Sign Up
            </button>
          </form>

          <p className="login-link">
            Already have an account?{" "}
            <Link to="/SignIn" className="login-text-link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
