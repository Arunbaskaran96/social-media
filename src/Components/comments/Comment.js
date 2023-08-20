import React, { useContext, useEffect } from 'react'
import "./Comment.css"
import Topbar from '../Topbar/Topbar'
import { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useRef } from 'react'
import { AuthContext } from '../../context/AuthContext'
function Comment() {
  const [post,setPost]=useState({})
  const [allcomment,setAllComment]=useState([])
  const params=useParams()
  const addComment=useRef(null)
  const {user}=useContext(AuthContext)
  const [disable,setDisable]=useState(false)
  useEffect(()=>{
    const getPost=async()=>{
      try {
        const {data}=await axios.get(`https://social-media-backend-f9xi.onrender.com/api/posts/${params.id}`)
        setPost(data)
        setAllComment(data.comments)
      } catch (error) {
        console.log(error)
      }
    }
    getPost()
  },[])

  const submitHandler=async()=>{
    try {
      if(addComment){
        setDisable(true)
        const newComment={
          userId:user._id,
          comment:addComment.current.value,
          userName:user.username,
          userImg:user.profilePicture
        }
        setAllComment([...allcomment,newComment])

        await axios.put(`https://social-media-backend-f9xi.onrender.com/api/posts/addcomment/${params.id}`,newComment)
        setDisable(false)
      }
    } catch (error) {
      setDisable(false)
      console.log(error)
    }
  }
  return (
    <div className='commentContainer'>
      <Topbar/>
      <div className='commentWrapper'>
      <div className='commentLeft'>
        <img className='commentImage'  src={`https://social-media-backend-f9xi.onrender.com/images/${post?.img}`} alt='posts'/>
      </div>
      <div className='commentRight'>
        <div className='commentRightTop1'>
        <h3 className='commentRightTop'>Comments</h3>
        <ul className=''>
          {
            allcomment&& allcomment.length>0 ?allcomment.map((item)=>{
              return(
                <div className='commentMiniWrapper'>
                  <>
                  <img src={item.userImg} alt='commentImage' className='commentUserImage'/>
                  </>
                  <div className='commentmini'>
                  <h6 className='commentUser'>{item.userName} : </h6>
                  <li className='commentText'>{item.comment}</li>
                  </div>
                  
                </div>
              )
            }):
            <div className='noCommentText'>No comment</div>
          }
        </ul>
        </div>
        <div className='commentRightBottom'>
          <textarea ref={addComment} className='commentInput' placeholder='Add your comment here'></textarea>
          <button disabled={disable} onClick={submitHandler} className='commentButton'>post</button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Comment