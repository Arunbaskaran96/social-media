import React, { useContext, useEffect, useState } from 'react'
import "./Post.css"
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'



function Post({item}) {
  const [user,setUser]=useState({})
  const {user:currentUser}=useContext(AuthContext)
  const[like,setLike]=useState(item.likes.length)
  const[comment,setComment]=useState(item.comments.length)
  const[isLiked,setisLiked]=useState(false)


  useEffect(()=>{
    setisLiked(item.likes.includes(currentUser._id))
  },[currentUser._id,item.likes])
  useEffect(()=>{
    getUser()
  },[item.userId])

  const liked={
    color:"blue"
  }

  const notLiked={
    color:"black"
  }

  console.log(comment)

  // useEffect(()=>{
  //   setComment(item.comments)
  // },[comment])

  const getUser=async()=>{
    try {
      const {data}=await axios.get(`https://social-media-backend-f9xi.onrender.com/api/users/${item.userId}`)
      setUser(data)
    } catch (error) {
      console.log(error)
    }
  }

  const likeHandler=async()=>{
    try {
      axios.put(`https://social-media-backend-f9xi.onrender.com/api/posts/${item._id}/like`,{userId:currentUser._id})
      setLike(isLiked ? like - 1 : like + 1);
      setisLiked(!isLiked);
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='postContainer'>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft'>
            <Link to={`/profilepage/${user._id}`}>
            <img className='postPicture' src={`https://social-media-backend-f9xi.onrender.com/images/${user.profilePicture}`} alt='posts'/>
            </Link>
            <span className='postUsername'>{user.username}</span>
            <span className='postTime'>{format(item.createdAt)}</span>
          </div>
          {/* <div className='postTopRight'>
          <i class="fa-solid fa-ellipsis-vertical"></i>
          </div> */}
          <div></div>
        </div>
        <div className='postCenter'>
          <span className='postText'>{item.desc} </span>
          <img className='postImage' src={`https://social-media-backend-f9xi.onrender.com/images/${item.img}`} alt='posts' />
        </div>
        <div className='postBottom'>
          <div className='postBottomLeft'>
            <i onClick={likeHandler} style={isLiked?liked:notLiked} class="fa-regular fa-thumbs-up likeImage"></i>
            <span>{`${like} likes for this post`}</span>
          </div>
          <div className='postBottomRight'>
            <i class="fa-regular fa-comment likeImage"></i>
            <Link className='linkbtn' to={`/comment/${item._id}`}>
            <span>{`${comment} comments for this post`}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post