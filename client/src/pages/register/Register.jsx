import axios from 'axios'
import './register.css'
import { useRef } from 'react'
const api=import.meta.env.VITE_API;
import {useNavigate}from'react-router-dom'
import{ Link} from 'react-router-dom'

const Register= () => {
    const name=useRef()
    const email=useRef()
    const password=useRef()
    const passwordAgain=useRef()
    const navigate=useNavigate()
    const handleClick=async(e)=>{
        e.preventDefault()
        if(passwordAgain.current.value!==password.current.value){
            passwordAgain.current.setCustomValidity("Passwords don't match")
        }else{
            const user={
                name:name.current.value,
                email:email.current.value,
                password:password.current.value,
            }
            try{
                const res=await axios.post(`${api}/auth/api/v1/signup`,user,{withCredentials:true})

                console.log(res);
                if(res){
                     navigate('/login')
                }
              
                
            }catch(error){
            console.log(error);
            }
            
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
                    <input type="text" placeholder='name' required ref={name}className="loginInput" />
                     <input type="email" placeholder='email'required ref={email}className="loginInput" />
                    <input type="password"  placeholder='password'required ref={password}className="loginInput" minLength="6"/>   
                    <input type="password"  placeholder='password again'required ref={passwordAgain}className="loginInput" />
                    <button className="loginButton" type='submit'>Sign up</button>
                    <Link to={'/login'}>
                    <button className="loginRegisterButton">
                        Log into Account
                    </button></Link>
                </form>
            </div>
        </div>

    </div>
  )
}

export default Register