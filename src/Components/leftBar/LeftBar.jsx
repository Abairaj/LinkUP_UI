import "./leftBar.scss";
import friend from "./../../assets/friend.png";
import { useSelector } from "react-redux";
import video_icon from "./../../assets/multimedia.png";
import explore_icon from "./../../assets/explore.png";
import messages_icon from "./../../assets/chat.png";
import PeopleIcon from "@mui/icons-material/People";
import ReportIcon from "@mui/icons-material/Report";
import { Avatar, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LeftBar = ({ Is_admin }) => {
  const user = useSelector((state) => state.user);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            {!Is_admin ? (
              <>
                <img src={`${API_URL}/${user.profile}`} alt="" />
                <span onClick={() => navigate("my_profile")}>
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
            </>
          ) : (
            <>
              <div className="item">
                <img src={explore_icon} alt="" />
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/explore")}
                >
                  Explore
                </span>
              </div>
              <div className="item">
                <img src={video_icon} alt="" />
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/reels")}
                >
                  Videos
                </span>
              </div>

              <div className="item">
                <img src={messages_icon} alt="" />
                <span>Chat</span>
              </div>
            </>
          )}
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
