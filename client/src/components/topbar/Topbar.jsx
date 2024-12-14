import "./topbar.css"
import {Search,Person,Chat,Notifications} from '@mui/icons-material'
import { useContext } from "react"
import {AuthContext}from "../../context/AuthContext"
const api=import.meta.env.VITE_API;
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
          <Link to='/' style={{textDecoration:'none',color:"white"}}>
            <span className="topbarLink">Home</span>
            </Link>
            <Link to='/peoples' style={{textDecoration:'none',color:"white"}}>
            <span className="topbarLink">Peoples</span>
            </Link>
            
          </div>
        <div className="topbarIcons">
        <Link to='/peoples' style={{textDecoration:'none',color:"white"}}>
            <div className="topbariconItem">
              < Person/>
              <span className="topbarIconBadge">0</span>
            </div>
          </Link>
            <Link to={'/messenger'} style={{textDecoration:'none',color:"white"}} >
            <div className="topbariconItem">
              < Chat/>
              <span className="topbarIconBadge">0</span>
            </div></Link>

            <div className="topbariconItem" >
             
              < Notifications/>
              <span className="topbarIconBadge">0</span>
            </div>
        </div>
        <Link to={`/profile/${user.existingUser._id}`}>
          <img src={user.existingUser.img||"http://res.cloudinary.com/dbxx49ers/image/upload/v1734202452/lml0ghr271z4xxat9ogt.png"} alt="" className="topbarImg" />
        </Link>
        </div>
        
        </div>
  )
}

export default Topbar