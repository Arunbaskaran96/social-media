import React, { useRef, useState } from 'react'
import "./Register.css"
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
  const nav=useNavigate()
  const username=useRef(null)
  const email=useRef(null)
  const password=useRef(null)
  const from=useRef(null)
  const [profilePicture,setProfilePicture]=useState(null)
  const [coverPicture,setCoverPicture]=useState(null)
  const relationship=useRef(null)
  const [disable,setDisable]=useState(false)

  const handleSubmit=async(e)=>{
    e.preventDefault()
    setDisable(true)
    const newData={
      username:username.current.value,
      email:email.current.value,
      password:password.current.value,
      from:from.current.value,
      realtionship:relationship.current.value
    }
    if(profilePicture){
      const data=new FormData()
      const fileName=profilePicture.name
      data.append("file",profilePicture)
      data.append("name",fileName)
      newData.profilePicture=fileName
      try {
        await axios.post("https://social-media-backend-f9xi.onrender.com/upload",data)
      } catch (error) {
        console.log(error)
      }
    }
    if(coverPicture){
      const data=new FormData()
      const fileName=coverPicture.name
      data.append("file",coverPicture)
      data.append("name",fileName)
      newData.coverPicture=fileName
      try {
        await axios.post("https://social-media-backend-f9xi.onrender.com/upload",data)
      } catch (error) {
        console.log(error)
      }
    }
    try {
      setDisable(true)
      await axios.post("https://social-media-backend-f9xi.onrender.com/api/auth/register",newData)
      alert("Successfully Registered")
      nav("/")
    } catch (error) {
      console.log(error)
    }
  }

  const btncolor={
    backgroundColor:"green"
  }
  return (
    <div className='registerContainer'>
      <form onSubmit={handleSubmit}>
        <div className='registerWrapper'>
        <div className='registerLeft'>
        <label className='registerLabel'>User Name</label><br/>
        <input className='registerInput' type='text' ref={username}/><br/>
        <label className='registerLabel'>Email</label><br/>
        <input className='registerInput' type='email' ref={email}/><br/>
        <label className='registerLabel'>Password</label><br/>
        <input className='registerInput' type='password' ref={password}/><br/>
      </div>
      <div className='registerRight'>
        <label className='registerLabel'>Profile Picture : </label>
        <input style={{marginLeft:"10px"}}  className='registerInput' accept='.png,.jpeg,.img,.jpg' type='file' onChange={(e)=>setProfilePicture(e.target.files[0])}/><br/>
        <label className='registerLabel'>Cover Picture : </label>
        <input style={{marginLeft:"10px"}} className='registerInput' accept='.png,.jpeg,.img,.jpg' type='file'  onChange={(e)=>setCoverPicture(e.target.files[0])} /><br/>
        <label className='registerLabel'>From</label><br/>
        <input className='registerInput' type='text'  ref={from}/><br/>
        <label className='registerLabel'>Relationship</label><br/>
        <input className='registerInput' type='text' ref={relationship} /><br/>
      </div>
        </div>
        <div className='registerBottom'>
          <input style={!disable ? btncolor: null} disabled={disable} className='registerButton' type='submit' value="Submit"/>
        </div>
      </form>
    </div>
  )
}

export default Register