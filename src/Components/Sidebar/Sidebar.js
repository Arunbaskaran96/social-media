import React, { useContext, useEffect, useState } from 'react'
import "./Sidebar.css"
import Friends from '../Friends/Friends'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

function Sidebar() {
  const [users,setUsers]=useState([])
  const {user}=useContext(AuthContext)
  const [search,setSearch]=useState("")

  useEffect(()=>{
    getAllUsers()
  },[])


  const getAllUsers=async()=>{
    try {
      const {data}=await axios.get(`https://social-media-backend-f9xi.onrender.com/api/users/getusers/${user._id}`)
      setUsers(data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='sidebar-container'>
      <div className='sidebarWrapper'>
        <ul className='sidebarList'>
          <li className='sidebarListItem'>
            <span  className='sidebarListItemText'>Feed</span>
          </li>
          <li className='sidebarListItem'>
            <span  className='sidebarListItemText'>Chats</span>
          </li>
          {/* <li className='sidebarListItem'>
            <span  className='sidebarListItemText'>Videos</span>
          </li>
          <li className='sidebarListItem'>
            <span  className='sidebarListItemText'>Groups</span>
          </li>
          <li className='sidebarListItem'>
            <span  className='sidebarListItemText'>Bookmarks</span>
          </li>
          <li className='sidebarListItem'>
            <span  className='sidebarListItemText'>Questions</span>
          </li>
          <li className='sidebarListItem'>
            <span  className='sidebarListItemText'>Jobs</span>
          </li>
          <li className='sidebarListItem'>
            <span  className='sidebarListItemText'>Events</span>
          </li>
          <li className='sidebarListItem'>
            <span  className='sidebarListItemText'>Courses</span>
          </li> */}
        </ul>
        {/* <button className='sidebarButton'>Show More</button> */}
        <hr className='sidebarhr'/>
        <h3 className='sidebarUsers'>All User's</h3>
        <input className='sidebarInput' type='text'  placeholder='Search Users Here...' onChange={(e)=>setSearch(e.target.value)}/>
        <hr className='sidebarhr'/>
        <ul className='sidebarFriendsList'>
          {
            users.filter(item=>item.username.toLowerCase().includes(search.toLowerCase())).map((item)=>{
              return(
                <Friends item={item} />
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default Sidebar