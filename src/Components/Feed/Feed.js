import React, { useContext, useEffect, useState } from 'react'
import "./Feed.css"
import Share from '../Share/Share'
import Post from '../Post/Post'

import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

function Feed({userId,userid}) {
  const {user}=useContext(AuthContext)
  const [post,setPost]=useState([])
  useEffect(()=>{
    userId ? getUserPost() : getPost()
  },[userId,user._id])


 
  const getUserPost=async()=>{
    try {
      const {data}=await axios.get(`https://social-media-backend-f9xi.onrender.com/api/posts/userpost/${userId}`)
      setPost(data.sort((a,b)=>{
        return new Date(b.createdAt) -new Date(a.createdAt) 
      }))
    } catch (error) {
      console.log(error)
    }
  }

  const getPost=async()=>{
    try {
      const {data}=await axios.get(`https://social-media-backend-f9xi.onrender.com/api/posts/timeline/${user?._id}`)
      setPost(data.sort((a,b)=>{
        return new Date(b.createdAt) -new Date(a.createdAt) 
      }))
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className='feed-container'>
      <div className='feedWrapper'>
        {
          userId===user._id && <Share/> ||userid===user._id && <Share/>
        }
        {
          post && post.map((item)=>{
            return(
              <Post key={item._id} item={item}/>
            )
          })
        }
      </div>
    </div>
  )
}

export default Feed



