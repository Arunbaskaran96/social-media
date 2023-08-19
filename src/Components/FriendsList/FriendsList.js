import React, { useEffect, useState } from 'react'
import "./FriendsList.css"
import axios from 'axios'

function FriendsList({item,currentUser}) {
  const friendId=item.members.filter((id)=>id!=currentUser)
  const [user,setUser]=useState({})
  useEffect(()=>{
    getUser()
  },[item,currentUser])

  const getUser=async()=>{
    try {
      const {data}=await axios.get(`http://localhost:8000/api/users/${friendId}`)
      setUser(data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='friendlistContainer'>
        <div className='friendlistWrapper'>
            <img className='friendProfileImg' src={user.profilePicture} alt='friendImg'/>
            <h5 className='friendProfileName'>{user.username}</h5>
        </div>
    </div>
  )
}

export default FriendsList