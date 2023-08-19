import React from 'react'
import "./Topbar.css"
import { Link, useNavigate } from 'react-router-dom'

function Topbar() {
  const nav=useNavigate()
  const clikHandler=()=>{
    localStorage.removeItem("user")
    window.location.replace("/")
  }
  return (
    <div className='topbarcontainer'>
        <div className='topbar-left'>
          <div className='logo'>Facebook</div>
        </div>
        <div className='topbar-center'>
          <input className="searchbar"/>
        </div>
        <div className='topbar-right'>
            <div className='topbar-links'>
              <span className="topbar-link">Homepage</span>
              <span className="topbar-link">Timeline</span>
            </div>
            <div className='topbar-icons'>
              <div className='topbar-icon-item'>
                <span className="icons">P</span>
                <span className='topbarIconbadge'>1</span>
              </div>
              <Link to="/message">
              <div className='topbar-icon-item'>
                <span className="icons">C</span>
                <span className='topbarIconbadge'>2</span>
              </div>
              </Link>
              <div className='topbar-icon-item'>
                <span className="icons">N</span>
                <span className='topbarIconbadge'>1</span>
              </div>
              <div>
                <button onClick={clikHandler} className='logoutButton'>Log out</button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Topbar