import React, { useContext, useEffect ,useState} from 'react'
import "./conversation.css"
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

const Conversations = ({conversation}) => {
  const [user,setUser]=useState(null)
  const {user:currentuser}=useContext(AuthContext)

  useEffect(()=>{
    const friendId=conversation.members.find(m=>m!==currentuser.existingUser._id)
   
    
    const getUser=async()=>{
      try{
      const res=await axios.get(`http://localhost:7000/auth/api/v1/${friendId}/profile`,{withCredentials:true})
     
      setUser(res.data.user)
     console.log(user);
     
      
     }catch(error){
      console.log(error);
      
     }
    }
    getUser()

  },[conversation])

  return (
    
    <div className="conversation">
        <img
         src={user?.img?user.img:"http://res.cloudinary.com/dbxx49ers/image/upload/v1733607093/mhgagojvyk3yr5stfsxx.jpg" }
        alt="" className="conversationImg" />
        <span className="conversationName"> {user?user.name:"name"}</span>
    </div>
  )
}

export default Conversations