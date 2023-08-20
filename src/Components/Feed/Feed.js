import React, { useContext, useEffect, useState } from 'react'
import "./Feed.css"
import Share from '../Share/Share'
import Post from '../Post/Post'

import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

function Feed({userId,userid}) {
  const {user}=useContext(AuthContext)
  const [post,setPost]=useState([])
  const [isLoading,setLoading]=useState(false)
  useEffect(()=>{
    userId ? getUserPost() : getPost()
  },[userId,user._id])


 
  const getUserPost=async()=>{
    try {
      setLoading(true)
      const {data}=await axios.get(`https://social-media-backend-f9xi.onrender.com/api/posts/userpost/${userId}`)
      setPost(data.sort((a,b)=>{
        return new Date(b.createdAt) -new Date(a.createdAt) 
      }))
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const getPost=async()=>{
    try {
      setLoading(true)
      const {data}=await axios.get(`https://social-media-backend-f9xi.onrender.com/api/posts/timeline/${user?._id}`)
      setPost(data.sort((a,b)=>{
        return new Date(b.createdAt) -new Date(a.createdAt) 
      }))
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className='feed-container'>
      {
        isLoading ? 
        <div className='feedLoading'>Loading... Please Wait</div>
        :
        <div className='feedWrapper'>
        {
          userId===user._id && <Share/> ||userid===user._id && <Share/>
        }
        {
          post.length>0 ? post.map((item)=>{
            return(
              <Post key={item._id} item={item}/>
            )
          }) : <h6 className='feedPost'>No Post Shared</h6>
        }
      </div>
      }
    </div>
  )
}

export default Feed



