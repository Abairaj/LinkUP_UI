import "./leftBar.scss";
import friend from "./../../assets/friend.png";
import { useSelector } from "react-redux";
import video_icon from "./../../assets/multimedia.png";
import explore_icon from "./../../assets/explore.png";
import messages_icon from "./../../assets/chat.png";
import PeopleIcon from "@mui/icons-material/People";
import ReportIcon from "@mui/icons-material/Report";
import { Avatar, Link } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useNavigate } from "react-router-dom";
import { clearCookies } from "../helpers";
import axiosInstance from "../../axosInstance";
import { useEffect } from "react";

const LeftBar = ({ Is_admin }) => {
  const user = useSelector((state) => state.user);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    clearCookies();
    axiosInstance
      .post("users/logout/")
      .then((response) => {
        if (response) {
          console.log(response.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            {!Is_admin ? (
              <>
                <Avatar src={user.profile} alt="" >{user.username[0]}</Avatar>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/profile/${user.id}`)}
                >
                  {user.username}
                </span>
              </>
            ) : (
              <h1>Admin</h1>
            )}
          </div>
          {Is_admin ? (
            <>
              <div className="item">
                <PeopleIcon />
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("admin_user")}
                >
                  User Management
                </span>
              </div>
              <div className="item">
                <ReportIcon />
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("admin_reports")}
                >
                  Reports
                </span>
              </div>
              <div
                onClick={handleLogout}
                style={{ cursor: "pointer" }}
                className="item"
              >
                <LogoutOutlinedIcon />
                <span>Logout</span>
              </div>
            </>
          ) : (
            <>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/")}
                className="item"
              >
                <HomeOutlinedIcon sx={{ fontSize: "35px" }} />
                <span>Home</span>
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/explore")}
                className="item"
              >
                <img src={explore_icon} alt="" />
                <span>Explore</span>
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/reels")}
                className="item"
              >
                <img src={video_icon} alt="" />
                <span>Videos</span>
              </div>

              <div
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/chat/2")}
                className="item"
              >
                <img src={messages_icon} alt="" />
                <span>Chat</span>
              </div>

              <div
                onClick={handleLogout}
                style={{ cursor: "pointer" }}
                className="item"
              >
                <LogoutOutlinedIcon />
                <span>Logout</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
    </div>
  );
};

export default LeftBar;
