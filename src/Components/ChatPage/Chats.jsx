import React, { useState,useEffect } from "react";
import Cookies from "js.cookie";
import axiosInstance from "../../AxiosQueries/axosInstance";
import { useNavigate } from "react-router-dom";

const Chats = () => {
  const navigate = useNavigate()
  const [usr, setUsrData] = useState([]);

  const fetchUser = () => {
    axiosInstance.get(`users/follow/${Cookies.get("id")}`).then((response) => {
      if (response.data) {
        console.log(response.data, "lllllllllllllllllll");
        setUsrData(response.data);
      } else {
        console.log(response);
      }
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="chats">

      {usr&&usr.length>0?usr.map((user)=>{
        return(      <div onClick={(()=>navigate('/'))} className="userChat">
        <img
          src="https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
        <div className="userChatinfo">
          <span>{user.username}</span>
          <p>Hello</p>
        </div>
      </div>)
      }):"NO USER"}

    </div>
  );
};

export default Chats;
