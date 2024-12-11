import './sidebar.css'
import {RssFeed} from '@mui/icons-material'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import MessageIcon from '@mui/icons-material/Message';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import CloseFriend from '../closeFriend/CloseFriend';
import {Link} from 'react-router-dom'


const Users=[{id:1,name:"raj roy",img:'6.jpg'},{id:2,name:"sarad paul",img:'2.jpg'},{id:2,name:"sarad paul",img:'2.jpg'},
  {id:2,name:"sarad paul",img:'2.jpg'},{id:2,name:"sarad paul",img:'2.jpg'},{id:2,name:"sarad paul",img:'2.jpg'},{id:2,name:"sarad paul",img:'2.jpg'}
]

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebarWrapper">
       <ul className="sidebarList">
        <li className="sidebarListItem">
          <RssFeed className='sidebarIcon'/>
          <span className="sidebarListItemText">Feed</span>
        </li>
        
        <li className="sidebarListItem">
          <PersonIcon className='sidebarIcon'/>
          <span className="sidebarListItemText">Peoples</span>
        </li>
        <li className="sidebarListItem">
          <SlideshowIcon className='sidebarIcon'/>
          <span className="sidebarListItemText">Videos</span>
        </li>
        <Link to={'/messenger'} style={{textDecoration:'none'}} >
        <li className="sidebarListItem">
          <MessageIcon className='sidebarIcon'/>
          <span className="sidebarListItemText">Messages</span>
        </li>
        </Link>
        <li className="sidebarListItem">
          <GroupsIcon className='sidebarIcon'/>
          <span className="sidebarListItemText">Groups</span>
        </li>
        <li className="sidebarListItem">
          <BookmarkIcon className='sidebarIcon'/>
          <span className="sidebarListItemText">Bookmarks</span>
        </li>

       </ul>
       <button className='sidebarButton'> Show more</button>
       <hr className='sidebarHr'/>
       <ul className="sidebarFriendList">
       {Users.map(u=>(
            <CloseFriend key={u.id} user={u}/>
           ))} 
       </ul>
      </div>
      </div>
  )
}

export default Sidebar