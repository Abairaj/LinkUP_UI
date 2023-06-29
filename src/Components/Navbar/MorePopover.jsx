import React from "react";
import { useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";
import { Chat, Explore, MoreHoriz } from "@mui/icons-material";
import video from "../../assets/multimedia.png";
import { Avatar } from "@mui/material";
import "./morepopover.scss";
const MorePopover = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const id = open ? "my-popover" : undefined;

  return (
    <div className="morepopover">
      <button
        style={{
          backgroundColor: "transparent",
          color: "whitesmoke",
          border: "none",
        }}
        onClick={handleClick}
      >
        <MoreHoriz />
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className="icons">
          <div onClick={()=>navigate('/chat/0')} className="icon">
            <Chat />
            <span>Chat</span>
          </div>
          <div onClick={()=>navigate('explore')} className="icon">
            <Explore />
            <span>Explore</span>
          </div>
          <div onClick={()=>navigate('/reels')} className="icon">
            <img style={{ width: "20px", height: "20px" }} src={video} alt="" />
            <span>Videos</span>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default MorePopover;
