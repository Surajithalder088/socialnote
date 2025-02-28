import { useContext,useRef } from 'react'

import './login.css'
import { loginCall } from '../../apiCalls'
import { AuthContext } from '../../context/AuthContext'
import {CircularProgress }from"@mui/material"
import {useNavigate}from'react-router-dom'
import { Link, redirect } from 'react-router-dom'

const Login = () => {
    const email=useRef()
    const password=useRef()
    const navigate=useNavigate()
const{user,isFetching,error,dispatch}=useContext(AuthContext)

    const handleClick=async(e)=>{
        e.preventDefault()
        try{
           const r=await loginCall({email:email.current.value,password:password.current.value},dispatch)  // thid dispatch is comming from  AuthContext
        if(r){
            console.log(r);
           navigate('/')
       
        } 
        }catch(error){
            alert("Invalid credentials")
            console.log(error);
            
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
                <span className="logindemo">
                    Use demo-user for testing : <br></br>email= peacock@gmail.com ,password=password
                </span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input type="email" placeholder='email' required className="loginInput" ref={email} />
                    <input type="password"  placeholder='password' required minLength="4" className="loginInput"  ref={password}/>
                    <button className="loginButton" disabled={isFetching}>
                        {isFetching?<CircularProgress color='white' size='20px' />:"Login"}</button>
                    <span className="loginForgot">Forgot Password?</span>
                    <Link to={'/register'}>
                    <button className="loginRegisterButton">
                    {isFetching?<CircularProgress color='white' size='20px' />:"Create new Account"}
                    </button></Link>
                </form>
            </div>
        </div>

    </div>
  )
}

export default Login