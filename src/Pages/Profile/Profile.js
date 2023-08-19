import React, { useEffect, useState } from 'react'
import "./Profile.css"
import Topbar from '../../Components/Topbar/Topbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Feed from '../../Components/Feed/Feed'
import Rightbar from '../../Components/Rightbar/Rightbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Profile() {
  const {id}=useParams()
  const [user,setUser]=useState({})

  useEffect(()=>{
    getUser()
  },[id])

  const getUser=async()=>{
    try {
      const {data}=await axios.get(`https://social-media-backend-f9xi.onrender.com/api/users/${id}`)
      setUser(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <Topbar/>
    <div className='profile'>
      <Sidebar/>
      <div className='profileRight'>
        <div className='profileRighttop'>
            <img className='coverPic' src={user.coverPicture} alt='coverPic'/>
            <img className='profilPic' src={user.profilePicture} alt='profilePic'/>
            <h3 className='userName'>{user.userName}</h3>
        </div>
        <div className='profileRightbottom'>
            <Feed profile userId={id}/>
            <Rightbar profile users={user}/>
        </div>
      </div>

    </div>
  </>
  )
}

export default Profile