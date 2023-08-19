import React, { useContext, useRef, useState } from 'react'
import "./Share.css"
import { AuthContext } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Share() {
    const {user}=useContext(AuthContext)
    const desc=useRef()
    const [file,setFile]=useState(null)
    const submitHandler=async(e)=>{
        e.preventDefault()
        const newData={
            userId:user._id,
            desc:desc.current.value,
        }
        if(file){
        const data=new FormData()
        const fileName=file.name;
        data.append("file",file)
        data.append("name",fileName)
        newData.img=fileName
        try {
            await axios.post("https://social-media-backend-f9xi.onrender.com/upload",data)
        } catch (error) {
            console.log(error)
        }

        }

        try {
            await axios.post("https://social-media-backend-f9xi.onrender.com/api/posts",newData)
            alert("Uploaded Successfully")
            window.location.reload()
        } catch (error) {
            console.log(error)
        }

    }
    const clickHandler=()=>{
        setFile(null)
    }
  return (
    <div className='shareContainer'>
        <div className='shareWrapper'>
            <div className='shareTop'>
                <Link to={`/profilepage/${user._id}`}>
                <img className='shareImg' src={user.profilePicture} alt='prfilepic'/>
                </Link>
                <input ref={desc} placeholder={`Hello ${user.username}.. What's in your mind?`} className='shareInput'/>
            </div>
            <hr className='shareHr'/>
            {
                file && (
                    <div className='shreImgwrapper'>
                       <img className='sharePostImg' src={URL.createObjectURL(file)} alt='imgs' />
                       <button onClick={clickHandler} className='cancelShareImg'>Cancel</button>
                    </div>
                )
            }
            <form className='sharebottom' onSubmit={submitHandler}>
                <label htmlFor='file' className='shareOptions'>
                    <i class="fa-solid fa-photo-film shareOptionIcon"></i>
                    <span  className='shareOptionText'>Photo/Video</span>
                    <input style={{display:"none"}} id='file' type='file' accept='.png,.jpeg,.img,.jpg' onChange={(e)=>setFile(e.target.files[0])} />
                </label>
                <div className='shareOptions'>
                <i class="fa-solid fa-tag shareOptionIcon"></i>
                    <span className='shareOptionText'>Tag</span>
                </div>
                <div className='shareOptions'>
                <i class="fa-solid fa-location-pin shareOptionIcon"></i>
                    <span className='shareOptionText'>Location</span>
                </div>
                <div className='shareOptions'>
                <i class="fa-solid fa-face-smile shareOptionIcon"></i>
                    <span className='shareOptionText'>Feelings</span>
                </div>
                <button type='submit' className='shareButton'>Post</button>
            </form>
        </div>
    </div>
  )
}

export default Share