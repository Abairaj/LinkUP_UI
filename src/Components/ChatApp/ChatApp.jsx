import React, {
  useState,
  useMemo,
  useEffect,
  useSyncExternalStore,
} from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import TextField from "@mui/material/TextField";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./chatapp.scss";
import axiosInstance from "../../axosInstance";
import debounce from "lodash.debounce";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChatApp = () => {
  const [searchVal, setSearchVal] = useState("");
  const [users,setUsers] = useState();
  const [userSearchlist, setUserSearchList] = useState([]);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const fetchUserData = () => {
    axiosInstance
      .get(`users/user_profile/${user.id}`)
      .then((response) => {
        console.log(response.data);
        setUsers(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };



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

  useEffect(() => {
    fetchUserData();
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className="chatusers">
      <div className="userlist">
        <input
          type="text"
          placeholder="Search User..."
          value={searchVal}
          onChange={handleSearchChange}
        />
        {userSearchlist.length > 0
          ? userSearchlist.map((usr) => {
              return (
                <List key={usr.id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar src={usr.profile}>
                        <AccountCircleIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={usr.username}
                      secondary={usr.last_login}
                    />
                  </ListItem>
                </List>
              );
            })
          :users && users.following.map((usr) => {
              return (
                <List key={usr.id} onClick={()=>navigate(`/chat/${usr.id}`)}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar src={usr.profile}>
                        <AccountCircleIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={usr.username}
                      secondary={usr.last_login}
                    />
                  </ListItem>
                </List>
              );
            })}
      </div>
    </div>
  );
};

export default ChatApp;
