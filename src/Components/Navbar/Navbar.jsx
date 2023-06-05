import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { toggle } from "./../../Redux/Slice/DarkModeSlice";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import Cookies from "js.cookie";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const user = useSelector((state) => state.user);
  const [userSearchlist, setuserSearchlist] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const [searchVal, setSearchVal] = useState();

  const searchUser = (key) => {
    setSearchVal(key);
    axios
      .get(`${API_URL}/users/user_search/?key=${key}`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      })
      .then((response) => {
        setuserSearchlist(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleToggle = () => {
    dispatch(toggle());
  };
  return (
    <div className="navbar">
      <div className="left">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <span>LinkUp</span>
        </Link>
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={handleToggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={handleToggle} />
        )}
        <div className="search">
          <SearchOutlinedIcon />
          <input
            type="text"
            value={searchVal}
            onChange={(e) => searchUser(e.target.value)}
            placeholder="search..."
          />
        </div>
        <div
          className="search_list"
          style={{
            position: "absolute",
            zIndex: "999",
            width: "180px",
            height: "auto",
          }}
        >
          {userSearchlist.length > 0
            ? userSearchlist.map((user) => {
                <p>{user.username}</p>;
              })
            : ""}
        </div>
      </div>
      <div className="right">
        <PersonOutlineOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <Link
          to={`my_profile/${user.full_name}`}
          style={{ cursor: "pointer", textDecoration: "none" }}
        >
          <div className="user">
            <img src={user.profile} alt="" />
            <span style={{ textDecoration: "none" }}>{user.username}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
