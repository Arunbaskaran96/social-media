import React, { useContext, useEffect, useRef, useState } from 'react'
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom'
import { loginCall } from '../../apicalls'
import { AuthContext } from '../../context/AuthContext'

function Login() {

  const email=useRef("")
  const password=useRef("")
 
  const {isFetching,user,isError,dispatch}=useContext(AuthContext)

  useEffect(()=>{
    email.current.focus()
  },[])


  const handleClick=(e)=>{
    e.preventDefault()
    loginCall(
      {email:email.current.value,
        password:password.current.value},
        dispatch)
  }

  return (
    <div className='loginContainer'>
       <div className='loginLeft'>
        <img className='loginLeftImg' src="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/800px-Facebook_f_logo_%282021%29.svg.png" alt='loginLeftImg' />
        <h4 className='loginLeftName'>facebook</h4>
        <h6 className='loginLeftDes'>Facebook helps you connect and share with the people in  your  life</h6>
       </div>
       <form className='loginRightContainer' onSubmit={handleClick}>
        <label  className='loginText'>Email</label><br/>
        <input className='loginInput' type='email'  ref={email}  /><br/>
        <label className='loginText'>Password</label><br/>
        <input className='loginInput' type='password' ref={password} /><br/>
        <input className='loginButton' type='submit' value="Log in"/><br/>
        <span style={{visibility:"hidden"}} className='forgotPassword'>Forgot Password ? </span><br/>
        <Link to="/register" className='signupButton'>Sign Up</Link>
       </form>
    </div>
  )
}

export default Login