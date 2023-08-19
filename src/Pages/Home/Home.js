import React, { useContext } from 'react'
import "./Home.css"
import Topbar from '../../Components/Topbar/Topbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Feed from '../../Components/Feed/Feed'
import Rightbar from '../../Components/Rightbar/Rightbar'
import { AuthContext } from '../../context/AuthContext'


function Home() {
  const {user}=useContext(AuthContext)
  return (
    <>
      <Topbar/>
      <div className='home-container'>
        <Sidebar/>
        <Feed userid={user._id}/>
        <Rightbar />
      </div>
    </>
  )
}

export default Home