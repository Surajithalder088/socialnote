import { useContext, useState } from 'react'

import './App.css'
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import Login from './pages/login/Login'
import Register from './pages/register/Register'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from './context/AuthContext'
import Messenger from './pages/messenger/Messenger'

function App() {
 const {user}=useContext(AuthContext)
 let id=null
 if(user!==null){
  id=user.existingUser._id
 }
  
  return (
   <BrowserRouter>
    <Routes>
      <Route exact path='/' element={user?<Home/>:<Login/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path={`/profile/:id`} element={user?<Profile />:<Login/>}/>
      <Route  path='/messenger' element={user?<Messenger/>:<Login/>}/>
      <Route path={`/profile`} element={user?<Profile userId={id} />:<Login/>}/>
    </Routes>
   </BrowserRouter>
  )
}

export default App
