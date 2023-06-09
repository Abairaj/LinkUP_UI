import "./navbar.scss";
import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Avatar } from "@mui/material";
import debounce from "lodash.debounce";
import { toggle } from "./../../Redux/Slice/DarkModeSlice";
import {
  HomeOutlined,
  DarkModeOutlined,
  SearchOutlined,
  WbSunnyOutlined,
  NotificationsOutlined,
  EmailOutlined,
  PersonOutlineOutlined,
} from "@mui/icons-material";

const Navbar = ({ admin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const user = useSelector((state) => state.user);
  const [userSearchlist, setUserSearchList] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const [searchVal, setSearchVal] = useState("");

  const handleSearch = (key) => {
    if (key === "") {
      setUserSearchList([]);
      return;
    }
    axios
      .get(`${API_URL}/users/user_search/?key=${key}`)
      .then((response) => {
        setUserSearchList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const debouncedSearch = useMemo(() => debounce(handleSearch, 700), []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchVal(value);
    debouncedSearch(value);
  };

  const handleToggle = () => {
    dispatch(toggle());
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className="navbar">
      <div className="left">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <span>LinkUp</span>
        </Link>
        {darkMode ? (
          <WbSunnyOutlined onClick={handleToggle} />
        ) : (
          <DarkModeOutlined onClick={handleToggle} />
        )}

        {!admin && (
          <div className="search">
            <SearchOutlined />
            <input
              type="text"
              value={searchVal}
              onChange={handleSearchChange}
              placeholder="Search..."
            />

            <div className="search_list">
              {userSearchlist.length > 0 && (
                <div className="search-suggestions">
                  {userSearchlist.map((user) => (
                    <div
                      onClick={() => navigate(`/profile/${user.id}`)}
                      key={user.id}
                      className="user_info"
                    >
                      {user.profile ? (
                        <Avatar src={user.profile} />
                      ) : (
                        <Avatar>{user.username[0]}</Avatar>
                      )}
                      <p key={user.id}>{user.username}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="right">
        {/* <PersonOutlineOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon /> */}
        <Link
          to={`my_profile/${user.full_name}`}
          style={{ cursor: "pointer", textDecoration: "none" }}
        >
          {!admin && (
            <div className="user">
              <img src={user.profile} alt="" />
              <span>{user.username}</span>
            </div>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
