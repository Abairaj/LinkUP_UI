import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ChatSidebar from "./ChatSidebar";
import Chat from "./Chat";
import "./chatStyles.scss";
import axiosInstance from "../../AxiosQueries/axosInstance";
import Cookies from "js.cookie";

const Chattapp = () => {
  const [userData, setUserData] = useState([]);

  const fetchUser = () => {
    axiosInstance.get(`users/follow/${Cookies.get("id")}`).then((response) => {
      if (response.data) {
        console.log(response.data, "lllllllllllllllllll");
        setUserData(response.data);
      } else {
        console.log(response);
      }
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
      <div className="chatapp">
        <div className="container">
          <ChatSidebar />
              <Chat usr={userData} />
         
        </div>
      </div>
  );
};

export default Chattapp;
