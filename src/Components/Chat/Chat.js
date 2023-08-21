import React, { useEffect, useState } from 'react'
import "./Chat.css"
import axios from 'axios'
import { format } from 'timeago.js'

function Chat({own,item}) {
  const [user,setUser]=useState(null)
  useEffect(()=>{
    getUser()
  },[item])

  const getUser=async()=>{
    try {
      const {data}=await axios.get(`https://social-media-backend-f9xi.onrender.com/api/users/${item.senderId}`)
      setUser(data)
    } catch (error) {
      console.log(error)  
    }
  }
  return (
    <div className={own ? "message own" :"message"}>
      <div className='messageTop'>
        <img className='messageImg' src={`https://social-media-backend-f9xi.onrender.com/images/${user.profilePicture}`} alt='profilePicture'/>
        <p className='messageText'>{item.message}</p>
      </div>
      <div className='messageBottom'>{format(item.createdAt)}</div>
    </div>
  )
}

export default Chat