import React, { useContext, useEffect, useRef, useState } from 'react'
import Topbar from '../../Components/Topbar/Topbar'
import "./Message.css"
import FriendsList from '../../Components/FriendsList/FriendsList'
import Chat from '../../Components/Chat/Chat'
import Online from '../../Components/Online/Online'
import {AuthContext} from "../../context/AuthContext"
import axios from 'axios'
import { io } from 'socket.io-client'

function Message() {
  const {user}=useContext(AuthContext)
  const[conversation,setConversation]=useState([])
  const [currentChat,setCurrentChat]=useState(null)
  const [messages,setMessage]=useState([])
  const [newMessage,setNewMessage]=useState("")
  const [arrivalMessage,setArrivalMessage]=useState({})
  const[onlineusers,setOnlineusers]=useState([])
  const scrollRef=useRef()
  const socket=useRef()

  useEffect(()=>{
    socket.current= io("https://social-media-socket-cvjt.onrender.com")
     socket.current?.on("getmessage",(data)=>{
       setArrivalMessage({
         senderId:data.senderId,
         message:data.message,
         createAt:Date.now()
       })
       console.log(data)
     })
   },[])
   console.log(socket.current)

  useEffect(()=>{
    socket.current?.emit("adduser",user._id)
    socket.current?.on("getusers",(users)=>{
      setOnlineusers(user.followings.filter(f=>users.some(u=>u.userId===f)))
    })
  },[user])




  useEffect(()=>{
    arrivalMessage && currentChat?.members.includes(arrivalMessage.senderId) &&
    setMessage(prev=>[...prev,arrivalMessage])
  },[arrivalMessage,currentChat])



  useEffect(()=>{
    getConversations()
  },[])

  const getConversations=async()=>{
    try {
      const {data}=await axios.get(`https://social-media-backend-f9xi.onrender.com/api/conversation/${user?._id}`)
      setConversation(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getMesaage()
  },[currentChat])
  const getMesaage=async()=>{
    try {
      const {data}=await axios.get(`https://social-media-backend-f9xi.onrender.com/api/message/${currentChat?._id}`)
      setMessage(data)
    } catch (error) {
      console.log(error)
    }
  }

  const submitHandler=async(e)=>{
    e.preventDefault()
    const newMsg={
      senderId:user?._id,
      message:newMessage,
      conversationId:currentChat?._id
    }

    const receiverId=currentChat?.members.find(item=>item!=user._id)
    console.log(receiverId)


    socket.current.emit("addmessage",{
      senderId:user?._id,
      receiverId,
      message:newMessage
    })


    try {
     const res= await axios.post('https://social-media-backend-f9xi.onrender.com/api/message/newMessage',newMsg)
      setMessage([...messages,res.data])
      setNewMessage("")
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour:"smooth"})
  },[messages])
  return (
    <div className='messageContainer'>
        <Topbar/>
        <div className='messageWrapper'>
            <div className='FriendsListWrapper'>
                <h4 className='FriendsList'>Friends</h4>
                <input className='FriendsListInt' placeholder='search for friend'/><br/>
                <hr/>
                {
                  conversation.map((item,id)=>{
                    return(
                      <div onClick={()=>setCurrentChat(item)}>
                        <FriendsList key={id} item={item} currentUser={user._id}/>
                      </div>
                    )
                  })
                }
            </div>
            <div className='ChatWrapper'>
              {
                currentChat ?
                <>
                <div className='chatTop'>
                {
                  messages.map((item,id)=>{
                    return(
                      <div ref={scrollRef}>
                        <Chat key={id} item={item} own={item.senderId===user._id}/>
                      </div>
                    )
                  })
                }
                </div>
              <div className='chatBottom'>
                <textarea value={newMessage} className='messageTextArea' placeholder='write something' onChange={(e)=>setNewMessage(e.target.value)}></textarea>
                <button className='messageSentBtn' onClick={submitHandler}>Send</button>
              </div>
              </>:<span className='noconversationText'>Open a conversation to start</span>
              }
            </div>
            <div className='OnlinetWrapper'>
              <Online onlineusers={onlineusers} currentId={user._id} setCurrentChat={setCurrentChat}/>
            </div>
        </div>
    </div>
  )
}

export default Message