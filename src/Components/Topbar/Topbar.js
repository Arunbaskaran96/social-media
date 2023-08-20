import React, { useContext } from 'react'
import "./Topbar.css"
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

function Topbar() {
  const {user}=useContext(AuthContext)
  const clikHandler=()=>{
    localStorage.removeItem("user")
    window.location.replace("/")
  }
  return (
    <div className='topbarcontainer'>
        <div className='topbar-left'>
          <div className='logo'>Facebook</div>
        </div>
        <div style={{visibility:"hidden"}} className='topbar-center'>
          <input className="searchbar"/>
        </div>
        <div  className='topbar-right'>
            <div className='topbar-links' style={{visibility:"hidden"}}>
              <span className="topbar-link">Homepage</span>
              <span className="topbar-link">Timeline</span>
            </div>
            <div className='topbar-icons'>
              <Link to={`/profilepage/${user._id}`}>
              <div className='topbar-icon-item'>
                <img className='topbarPicture' src={`https://social-media-backend-f9xi.onrender.com/images/${user.profilePicture}`} alt="userPicture"/>
              </div>
              </Link>
              <div>
                <button onClick={clikHandler} className='logoutButton'>Log out</button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Topbar