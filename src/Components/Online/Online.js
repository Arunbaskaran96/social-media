import React, { useEffect, useState } from 'react'
import  "./Online.css"
import axios from 'axios'
function Online({onlineusers,currentId,setCurrentChat}) {
  const [friends,setFriends]=useState([])
  const [online,setOnline]=useState([])

  useEffect(()=>{
    const getFriends=async ()=>{
      try {
        const {data}=await axios.get(`http://localhost:8000/api/posts/friends/${currentId}`)
        setFriends(data)
      } catch (error) {
        console.log(error)
      }
    }
    getFriends()
  },[currentId])

  useEffect(()=>{
    setOnline(friends.filter(f=>onlineusers.includes(f._id)))
  },[onlineusers,friends])


  const handleClick=async(user)=>{
    try {
      const {data}=await axios.get(`http://localhost:8000/api/conversation/find/${currentId}/${user._id}`)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='online'>
        <h5 className='onlineHeading'>Online Friends</h5>
        {
          online.length>0?
          online.map((item)=>{
            return(
              <div className='onlineWrapper' onClick={(user)=>handleClick(user)}>
              <img className='onlineImg' src={item.profilePicture} alt='onlineImg'/>
              <img className='onlinedotImg' src='https://upload.wikimedia.org/wikipedia/commons/2/2d/Basic_green_dot.png' alt=''/>
              <h5 className='onlineName'>{item.username}</h5>
          </div>
            )
          })
          :
      <span className='online-friends'>No one is online right now</span>
        }
    </div>
  )
}

export default Online