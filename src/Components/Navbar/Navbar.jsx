import "./navbar.scss";
import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import debounce from "lodash.debounce";
import { toggle } from "./../../Redux/Slice/DarkModeSlice";
import {
  Chat,
  DarkModeOutlined,
  MoreHoriz,
  SearchOutlined,
  WbSunnyOutlined,
} from "@mui/icons-material";
import axiosInstance from "../../axosInstance";
import MorePopover from "./MorePopover";
const Navbar = ({ admin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const user = useSelector((state) => state.user);
  const [userSearchlist, setUserSearchList] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [mobSearch, setMobSearch] = useState(false);
  const isMobile = window.innerWidth <= 678;

  const handleSearch = (key) => {
    if (key === "") {
      setUserSearchList([]);
      return;
    }
    axiosInstance
      .get(`/users/user_search/?key=${key}`)
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
        <Link
          to={!admin ? "/" : "/admin_dashboard"}
          style={{ textDecoration: "none" }}
        >
          {!mobSearch && <span>LinkUp</span>}
        </Link>
        {darkMode
          ? !mobSearch && <WbSunnyOutlined onClick={handleToggle} />
          : !mobSearch && <DarkModeOutlined onClick={handleToggle} />}

        {!admin && (
          <div className="search">
            {isMobile ? (
              <SearchOutlined onClick={() => setMobSearch(!mobSearch)} />
            ) : (
              <SearchOutlined />
            )}

            {(isMobile && mobSearch) || !isMobile ? (
              <input
                type="text"
                value={searchVal}
                onChange={handleSearchChange}
                placeholder="Search..."
              />
            ) : null}

            {(isMobile && mobSearch) || !isMobile ? (
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
            ) : null}
          </div>
        )}

        {!admin && !mobSearch && isMobile && (
          <>
            <div onClick={()=>navigate(`my_profile/${user.full_name}`)} className="user">
              <Avatar style={{width:'30px',height:'30px'}} src={user.profile}>{user.username[0]}</Avatar>
            </div>

            <div className="icons">
              <MorePopover />
            </div>
          </>
        )}
      </div>
      {!isMobile || !mobSearch ? (
        <div className="right">
          <Link
            to={`my_profile/${user.full_name}`}
            style={{ cursor: "pointer", textDecoration: "none" }}
          >
            {!admin && (
              <div className="user">
                <Avatar src={user.profile}>{user.username[0]}</Avatar>
                <span>{user.username}</span>
              </div>
            )}
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
