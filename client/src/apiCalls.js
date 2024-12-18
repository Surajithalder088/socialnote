import axios from 'axios'
const api=import.meta.env.VITE_API;

export const loginCall=async(userCredential,dispatch)=>{
    dispatch({type:"LOGIN_START"})
    try{
        const res=await axios.post(`${api}/auth/api/v1/login`,userCredential,{withCredentials:true});
    
        
        dispatch({type:'LOGIN_SUCCESS',payload:res.data})
       
        return res;
      

    }catch(error){
        alert("Invalid credentials")
        dispatch({type:'LOGIN_FAILURE',payload:error})
    }
}