import "./leftBar.scss";
import friend from "./../../assets/friend.png";
import { useSelector } from "react-redux";
import video_icon from "./../../assets/multimedia.png"
import explore_icon from "./../../assets/explore.png"
import messages_icon from "./../../assets/chat.png"
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";


const LeftBar = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate()


  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img
              src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80"
              alt=""
            />
            <span>{user.username}</span>
          </div>
          <div className="item">
            <img src={explore_icon} alt="" />
            <span>Explore</span>
          </div>
          <div className="item">
            <img src={video_icon} alt="" />
            <span style={{cursor:"pointer"}} onClick={()=>navigate('/reels')}>Videos</span>
          </div>

          <div className="item">
            <img src={messages_icon} alt="" />
            <span>Chat</span>
          </div>
        </div>
        <hr />
        {/* <div className="menu">
          <span>Your Shortcuts</span>
          <div className="item">
            <img src={friend} alt="" />
            <span>Friends</span>
          </div>{" "}
          <div className="item">
            <img src={friend} alt="" />
            <span>Followers</span>
          </div>{" "}
          <div className="item">
            <img src={friend} alt="" />
            <span>Following</span>
          </div>{" "}
          <div className="item">
            <img src={friend} alt="" />
            <span>My Post</span>
          </div>{" "}
        </div> */}
        <hr />
        {/* <div className="menu">
          <span>Others</span>
          <div className="item">
            <img src={friend} alt="" />
            <span>Friends</span>
          </div>{" "}
          <div className="item">
            <img src={friend} alt="" />
            <span>Friends</span>
          </div>{" "}
          <div className="item">
            <img src={friend} alt="" />
            <span>Friends</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LeftBar;
