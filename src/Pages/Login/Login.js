import React, { useContext, useEffect, useRef, useState } from 'react'
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom'
import { loginCall } from '../../apicalls'
import { AuthContext } from '../../context/AuthContext'

function Login() {

  const email=useRef("")
  const password=useRef("")
 
  const {isFetching,user,isError,dispatch}=useContext(AuthContext)


  const handleClick=(e)=>{
    e.preventDefault()
    loginCall(
      {email:email.current.value,
        password:password.current.value},
        dispatch)
  }

  return (
    <div className='loginContainer'>
       <form onSubmit={handleClick}>
        <label  className='loginText'>Email</label><br/>
        <input className='loginInput' type='email'  ref={email}  /><br/>
        <label className='loginText'>Password</label><br/>
        <input className='loginInput' type='password' ref={password} /><br/>
        <input className='loginButton' type='submit' value="Log in"/><br/>
        <span className='forgotPassword'>Forgot Password ? </span><br/>
        <Link to="/register" className='signupButton'>Sign Up</Link>
       </form>
    </div>
  )
}

export default Login