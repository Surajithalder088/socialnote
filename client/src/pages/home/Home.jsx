
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'

import './home.css'


const Home = () => {
  const api=import.meta.env.VITE_TEST;
  console.log(api);
  
  return (
    <>
 
    <Topbar/>
    <div className="homeContainer">
      <Sidebar/>
      <Feed/>
      <Rightbar/>
    </div>
    
 </>
  )
}

export default Home