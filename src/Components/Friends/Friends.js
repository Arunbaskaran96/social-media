import React from 'react'
import "./Friends.css"
import { Link } from 'react-router-dom'

function Friends({item}) {
  return (
    <Link style={{textDecoration:"none",color:"black"}}  to={`/profilepage/${item._id}`}>
    <li className='sidebarFriend'>
    <img className='friendImg' src={`https://social-media-backend-f9xi.onrender.com/images/${item.profilePicture}`}/>
    <span className='sidebarFriendName'>{item.username}</span>
  </li>
  </Link>
  )
}

export default Friends