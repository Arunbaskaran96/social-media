import React from 'react'
import "./Register.css"
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
  const nav=useNavigate()
  const formik=useFormik({
    initialValues:{
      username:"",
      email:"",
      password:"",
      confirmpassword:"",
      from:"",
      profilepicture:"",
      coverpicture:"",
      relationship:""
    },
    validate:()=>{},
    onSubmit:async(value)=>{
      try {
        await axios.post("https://social-media-backend-f9xi.onrender.com/api/auth/register",value)
        alert("Successfully Registered")
        nav("/")
      } catch (error) {
        console.log(error)
      }
    }
  })
  return (
    <div className='loginContainer'>
        <form onSubmit={formik.handleSubmit}>
          <label className='loginText' >Username</label><br/>
          <input className='loginInput' type='text' name='username' value={formik.values.username} onChange={formik.handleChange}/><br/>
          <label  className='loginText'>Email</label><br/>
          <input className='loginInput' type='email' name='email' value={formik.values.email} onChange={formik.handleChange}/><br/>
          <label className='loginText'>Password</label><br/>
          <input className='loginInput' type='password' name='password' value={formik.values.password} onChange={formik.handleChange}/><br/>
          <label className='loginText'>Confirm Password</label><br/>
          <input className='loginInput' type='password' name='confirmpassword' value={formik.values.confirmpassword} onChange={formik.handleChange}/><br/>
          <label className='loginText'>From</label><br/>
          <input className='loginInput' type='text' name='from' value={formik.values.from} onChange={formik.handleChange}/><br/>
          <label className='loginText'>Relationship</label><br/>
          <input className='loginInput' type='text' name='relationship' value={formik.values.relationship} onChange={formik.handleChange}/><br/>
          <label className='loginText'>Profile Picture</label><br/>
          <input className='loginInput' type='text' name='profilepicture' value={formik.values.profilepicture} onChange={formik.handleChange}/><br/>
          <label className='loginText'>Cover Picture</label><br/>
          <input className='loginInput' type='text' name='coverpicture' value={formik.values.coverpicture} onChange={formik.handleChange}/><br/>
          <input className='loginButton' type='submit' value="Submit"/><br/>
        </form>
    </div>
  )
}

export default Register