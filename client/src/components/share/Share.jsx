import './share.css'
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import {CircularProgress }from"@mui/material"
import axios from'axios'
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate}from'react-router-dom'
const api=import.meta.env.VITE_API;

const Share = () => {
    const {user}=useContext(AuthContext)
    const description=useRef()
    const [fetching,setFetching]=useState(false)
    const [file,setFile]=useState(null)
    const navigate=useNavigate()

    const submitHandler=async(e)=>{
        e.preventDefault()
        const newPost={
            description:description.current.value,
        }
        if(file!==null){
            const data=new FormData();
            const filename=file.name;
            data.append('file',file);
            data.append('name',filename);
          // newPost.photo=filename;
            try{
                setFetching(true)
               const response= await axios.post(`${api}/post/api/v1/file`,data) //uploading tocloud
               console.log({res:response.data.url});
               
               newPost.photo=response.data.url; //setting cloud url  to database
              
            }catch(err){
                console.log(" failed to get file",err);
                
        }

        }
        try{
           await axios.post(`${api}/post/api/v1/create`,newPost,{withCredentials:true})
           console.log('posted');
           setFetching(false)
           navigate('/')
           setFile(null)
          // window.location.reload();
           
        }catch(error){
            console.log("failed to posted",error);
            
        }
    }
  return (
    <div className='share'>
        <div className="shareWrapper">
            <div className="shareTop">
                <img className='shareProfileImage' src={user.existingUser.img ||"http://res.cloudinary.com/dbxx49ers/image/upload/v1734202452/lml0ghr271z4xxat9ogt.png"} alt='image'/>
                <input placeholder={'What`s in your mind  '+user.existingUser.name+" ?"}
                 className='shareInput'
                 ref={description}
                 />
            </div>
            <hr className='shareHr'/>
            {file && (
                <div className="shareImgContainer">
                    <img className='shareImg' src={URL.createObjectURL(file)}/>
                    <CloseIcon className='shareCancelImg' onClick={()=>setFile(null)}/>

                </div>
            )}

            <form className="shareBottom" onSubmit={submitHandler}>
                <div className="shareOptions">
                    <label htmlFor='file' className="shareOption">
                        <PermMediaIcon htmlColor='tomato' className='shareIcon'/>
                        <span className="shareOptionsText">Photo or Video</span>
                        <input 
                        style={{display:"none"}}
                        type='file' id='file'
                         accept='.png,.jpg,.jpeg,.mp4,.MP4'
                         onChange={(e)=>{
                            setFile(e.target.files[0])
                         }}
                         />
                    </label>
                    <div className="shareOption">
                        <LabelIcon htmlColor='blue' className='shareIcon'/>
                        <span className="shareOptionsText">Tag</span>
                    </div>
                    <div className="shareOption">
                        < AddLocationAltIcon htmlColor='green' className='shareIcon'/>
                        <span className="shareOptionsText">Location</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotionsIcon htmlColor='yellow' className='shareIcon'/>
                        <span className="shareOptionsText">Feelings</span>
                    </div>

                </div>
                <button className="shareButton" type='submit'>
                {fetching?<CircularProgress color='white' size='20px' />:"Share"}
                

                </button>
            </form>
        </div>
       </div>
  )
}

export default Share