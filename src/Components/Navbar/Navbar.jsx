import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import {toggle} from './../../Redux/Slice/DarkModeSlice';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const Navbar = () => {
  const dispatch = useDispatch()
  const darkMode = useSelector(state=>state.theme.darkMode)
  const user = useSelector(state=>state.user)

  const handleToggle = () =>{
    dispatch(toggle())
  }
  return (
    <div className="navbar">
      <div className="left">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <span>LinkUp</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode?<WbSunnyOutlinedIcon onClick={handleToggle}/>:<DarkModeOutlinedIcon onClick={handleToggle} />}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="search..." />
        </div>
      </div>
      <div className="right">
        <PersonOutlineOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <Link to={`profile/${user.full_name}`} style={{cursor:"pointer",textDecoration:"none"}}>
        <div className="user">
          <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80" alt="" />
          <span>{user.username}</span>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
