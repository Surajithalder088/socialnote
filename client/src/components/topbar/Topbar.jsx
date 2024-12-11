import "./topbar.css"
import {Search,Person,Chat,Notifications} from '@mui/icons-material'
import { useContext } from "react"
import {AuthContext}from "../../context/AuthContext"

import {Link} from 'react-router-dom'

const Topbar = () => {

   const {user}=useContext(AuthContext)
  console.log(user.existingUser);

 
  
  return (
    <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to='/' style={{textDecoration:'none'}}>
            <span className="logo">socialnote</span>
            </Link>
        </div>
        <div className="topbarCentre">
            <div className="searchbar">
              <Search className="searchIcon"/>
              <input placeholder="Search for friend,posts or videos" className="searchInput"/>
            </div>
        </div>
        <div className="topbarRight">

          <div className="topbarlinks">
            <span className="topbarLink">Home</span>
            <span className="topbarLink">Timeline</span>
          </div>
        <div className="topbarIcons">
            <div className="topbariconItem">
              < Person/>
              <span className="topbarIconBadge">1</span>
            </div>
            <Link to={'/messenger'} style={{textDecoration:'none'}} >
            <div className="topbariconItem">
              < Chat/>
              <span className="topbarIconBadge">2</span>
            </div></Link>

            <div className="topbariconItem">
              < Notifications/>
              <span className="topbarIconBadge">1</span>
            </div>
        </div>
        <Link to={`/profile/${user.existingUser._id}`}>
          <img src={user.existingUser.img||"/public/profile.png"} alt="" className="topbarImg" />
        </Link>
        </div>
        
        </div>
  )
}

export default Topbar