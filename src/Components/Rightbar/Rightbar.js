import React, { useContext, useEffect, useState } from 'react'
import "./Rightbar.css"
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
function Rightbar({profile,users}) {
  const [followings,setFollowings]=useState([])
  const {user,dispatch}=useContext(AuthContext)
  const [isPresent,setIsPresent]=useState(false)




  useEffect(()=>{
    setIsPresent(user.followings.includes(users?._id))
  },[user,users])

  useEffect(()=>{
    if(!users){
      const getFollowings=async()=>{
        try {
          const {data}=await axios.get(`https://social-media-backend-f9xi.onrender.com/api/posts/friends/${user?._id}`)
          setFollowings(data)
        } catch (error) {
          console.log(error)
        }
      }
          getFollowings()
    }else{
      const getFollowings=async()=>{
    try {
      const {data}=await axios.get(`https://social-media-backend-f9xi.onrender.com/api/posts/friends/${users?._id}`)
      setFollowings(data)
    } catch (error) {
      console.log(error)
    }
  }
      getFollowings()
    }
  },[users])

  const getFollowings=async()=>{
    try {
      const {data}=await axios.get(`https://social-media-backend-f9xi.onrender.com/api/posts/friends/${users?._id}`)
      setFollowings(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick=async()=>{
    try {
      if(isPresent){
        await axios.put(`https://social-media-backend-f9xi.onrender.com/api/users/${users?._id}/unfollow`,{userId:user._id})
        dispatch({type:"unfollow",payload:users._id})
        
      }else{
        await axios.put(`https://social-media-backend-f9xi.onrender.com/api/users/${users?._id}/follow`,{userId:user._id})
        dispatch({type:"follow",payload:users._id})
      }
      setIsPresent(!isPresent)
    } catch (error) {
      console.log(error)
    }
  }


  const HomeRightBar=()=>{
    
    return(
      <>
        {/* <div className='birthdayContainer'>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7_CEqlyGA40sRwSx1rrHqmODzIXk5YbgAyCF9DEXa&s' className='birthdayImg' alt='birthdayImg'/>
          <span className='birthdayText'> <b>Kavin</b> and <b>2 other friends</b> birthday today</span>
        </div> */}
        <h4 className='onlineFrnds'>Your  Followings</h4>
        {
          followings.map((item)=>{
            return(
              <div className='userFollwings'>
              <Link to={`/profilepage/${item._id}`} style={{textDecoration:"none",color:"black"}}>
              <div className='userFollowing'>
                <img className='userFollowingImg' src={`https://social-media-backend-f9xi.onrender.com/images/${item.profilePicture}`} alt='userFollwingImage'/>
                <span className='UserFollowingName'>{item.username}</span>
              </div>
              </Link>
            </div>
            )
          })
        }
        </>
    )
  }

  const ProfileRightBar=()=>{
    return(
      <div>
        {
          user._id !=users._id && <button className='actionButton' onClick={handleClick}>{isPresent ? "Unfollow" :"Follow"}</button>
        }
        <h4 className='profileRightbarUser'>User Information</h4>
        <div className='profileRightbarUserInfo'>
          <span><b>City : </b></span>
          <spn>{users.from}</spn>
        </div>
        <div className='profileRightbarUserInfo'>
          <span><b>Relationship : </b></span>
          <spn>{users.realtionship}</spn>
        </div>
        <h4 className='profileUserFriends'>
          User Friends
        </h4>
        {
          followings.map((item)=>{
            return(
              <div className='userFollwings'>
              <Link to={`/profilepage/${item._id}`} style={{textDecoration:"none",color:"black"}}>
              <div className='userFollowing'>
                <img className='userFollowingImg' src={item.profilePicture} alt='userFollwingImage'/>
                <span className='UserFollowingName'>{item.username}</span>
              </div>
              </Link>
            </div>
            )
          })
        }
      </div>
    )
  }
  return (
    <div className='rightbar-container'>
      <div className='rightbarWrapper'>
        {
          profile  ? <ProfileRightBar/> : <HomeRightBar/>
        }
      </div>
    </div>
  )
}

export default Rightbar