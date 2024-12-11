import React, {useState,useEffect, useContext, useRef } from 'react'
import Topbar from '../../components/topbar/Topbar'

import "./messenger.css"
import axios from 'axios'
import Conversations from '../../components/conversations/Conversations'
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import { AuthContext } from '../../context/AuthContext'
const Messenger = () => {

  const {user}=useContext(AuthContext)
const [conversations,setConversations]=useState([])
const [currentChat,setCurrentChat]=useState(null)
const [newMessage,setNewMessage]=useState("")
const [messages,setMessages]=useState([])
const scrollRef=useRef()

useEffect(()=>{

  const getConversations= async()=>{
    try{

    
    const response=await axios.get(`http://localhost:7000/conversation/api/v1/${user.existingUser._id}`,)
      setConversations(response.data)
      console.log(conversations);
      
  }catch(error){
        console.log(error);
        
      }
  }
  getConversations()
}
,[user])


// setting this function  also outside useeffect so that after submit new message it could be called
const getMessages=async()=>{
  try{
  const res=await axios.get(`http://localhost:7000/message/api/v1/${currentChat?._id}`)
  
    setMessages(res.data)
      console.log(res.data);
 }catch(error){
  console.log(error);
  
}
}

useEffect(() => {
  const getMessages=async()=>{
    try{
    const res=await axios.get(`http://localhost:7000/message/api/v1/${currentChat?._id}`)
    
      setMessages(res.data)
        console.log(res.data);
   }catch(error){
    console.log(error);
    
  }
  }
  getMessages()
}, [currentChat])

const handleSubmit=async(e)=>{
  e.preventDefault;
  const message={
    sender:user.existingUser._id,
    text:newMessage,
    conversationId:currentChat?._id,

  }
  try{
    if(message.text===""){
      return
    }
    const res=await axios.post(`http://localhost:7000/message/api/v1/`,message)
     
    console.log(res.data);
    setCurrentChat(currentChat)
    getMessages()
    setNewMessage("")

  }catch(error){
    console.log(error);
    
  }

}
useEffect(() => {
  scrollRef.current?.scrollIntoView({behavior:"smooth"})

}, [messages])


  return (
<>
    <Topbar/>
    <div
    className='messenger'
    >
      <div className="chatMenu">
        <div className="chatMenuWrapper"> 
          <input placeholder='Search for friends' className='chatMenuInput'/>
          <h6>Previous Conversations</h6>
          {
            conversations.map(c=>(
              <div onClick={()=>setCurrentChat(c)}>
              <Conversations conversation={c}/>
              </div>
            ))
          }
          
       
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {
              currentChat?
              <>
           <div className="chatBoxTop">
            { messages.map(m=>(
              <div ref={scrollRef}>
              <Message message={m} own={m.sender===user.existingUser._id}/>
              </div>
            ))
              
            }
           </div>
           <div className="chatBoxBottom">
            <textarea 
            onChange={(e)=>setNewMessage(e.target.value)}
            value={newMessage}
            className='chatMessageInput' placeholder='write a message...'></textarea>
            <button className="chatSubmitButton" onClick={handleSubmit}>
              Send</button>
           </div></>:
           <>
           <span className='noConversationText'>Open a conversation to start a chat</span>
           </>
           }
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
            
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            </div>
      </div>
   
        </div>
      </>  
  )
}

export default Messenger ;