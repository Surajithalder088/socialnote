import { useContext,useRef } from 'react'

import './login.css'
import { loginCall } from '../../apiCalls'
import { AuthContext } from '../../context/AuthContext'
import {CircularProgress }from"@mui/material"
import {useNavigate}from'react-router-dom'
import { redirect } from 'react-router-dom'

const Login = () => {
    const email=useRef()
    const password=useRef()
    const navigate=useNavigate()
const{user,isFetching,error,dispatch}=useContext(AuthContext)

    const handleClick=async(e)=>{
        e.preventDefault()
        
        
        const r=await loginCall({email:email.current.value,password:password.current.value},dispatch)  // thid dispatch is comming from  AuthContext
        if(r){
            console.log(user);
           navigate('/')
       
        }
     }
  return (
    <div className='login'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Socialnote</h3>
                <span className="loginDesc">
                    Connect with friends and the world around you on Socialnote.
                </span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input type="email" placeholder='email' required className="loginInput" ref={email} />
                    <input type="password"  placeholder='password' required minLength="6" className="loginInput"  ref={password}/>
                    <button className="loginButton" disabled={isFetching}>
                        {isFetching?<CircularProgress color='white' size='20px' />:"Login"}</button>
                    <span className="loginForgot">Forgot Password?</span>
                    <button className="loginRegisterButton">
                    {isFetching?<CircularProgress color='white' size='20px' />:"Create new Account"}
                    </button>
                </form>
            </div>
        </div>

    </div>
  )
}

export default Login