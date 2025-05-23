import React, { useContext, useState } from 'react'
import loginIcons from '../assets/image.png'
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Link, useNavigate } from 'react-router-dom'
import SummaryApi from '../common'
//import { toast } from 'react-toastify'
import Context from '../context/index'
import './SignIn.css' // Make sure this file exists

const SignIn = () => {
    const [showPassword,setShowPassword] = useState(false)
    const [data,setData] = useState({
        email : "",
        password : ""
    })
    const navigate = useNavigate()
    const  { fetchUserDetails } = useContext(Context)
    const handleOnChange = (e) =>{
      const { name , value } = e.target

      setData((preve)=>{
          return{
              ...preve,
              [name] : value
          }
      })
  }


    const handleSubmit = async(e) =>{
      e.preventDefault()

      const dataResponse = await fetch(SummaryApi.signIn.url,{
          method : SummaryApi.signIn.method,
          credentials : 'include',
          headers : {
              "content-type" : "application/json"
          },
          body : JSON.stringify(data)
      })

      const dataApi = await dataResponse.json()

      if(dataApi.success){
        alert(dataApi.message);
          navigate('/')
          fetchUserDetails()
          //fetchUserAddToCart()
      }

      if(dataApi.error){
          alert(dataApi.message)
          
      }

  }

  console.log("data login",data)
  
  return (
    <section id='login'>
      <div className='login-container'>

        <div className='login-box'>
          <div className='login-icon'>
            <img src={loginIcons} alt='login icon' />
          </div>

          <form className='login-form' onSubmit={handleSubmit}>
            <div className='form-group'>
              <label>Email:</label>
              <div className='input-wrapper'>
                <input
                  type='email'
                  name='email'
                  placeholder='Enter email'
                  value={data.email}
                  onChange={handleOnChange}
                />
              </div>
            </div>

            <div className='form-group'>
              <label>Password:</label>
              <div className='input-wrapper password-field'>
                <input
                  type={showPassword ? "text" : "password"}
                  name='password'
                  placeholder='Enter password'
                  value={data.password}
                  onChange={handleOnChange}
                />
                <div className='toggle-password' onClick={() => setShowPassword(prev => !prev)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <Link to="/forgot-password" className='forgot-link'>
                Forgot password?
              </Link>
            </div>

            <button type="submit" className='login-button'>Login</button>
          </form>

          <p className='signup-text'>
            Don't have an account? <Link to="/sign-up" className='signup-link'>SignUp</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default SignIn
