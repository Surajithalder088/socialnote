import axios from 'axios'

export const loginCall=async(userCredential,dispatch)=>{
    dispatch({type:"LOGIN_START"})
    try{
        const res=await axios.post("http://localhost:7000/auth/api/v1/login",userCredential,{withCredentials:true});
        dispatch({type:'LOGIN_SUCCESS',payload:res.data})
       
        return res;
      

    }catch(error){
        dispatch({type:'LOGIN_FAILURE',payload:error})
    }
}