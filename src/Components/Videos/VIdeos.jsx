import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import axios from "axios";
import Cookies from "js.cookie";

export default function Videos() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [reels, setReels] = useState([]);
  useEffect(() => {
    fetchReels();
  }, []);

  const fetchReels = () => {
    axios
      .get(`${API_URL}/post/reels/`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      })
      .then((response) => {
        console.log(response, "videos......");
        setReels(response.data);
      })
      .catch((errors) => {
        alert(errors);
      });
  };
  return (
    <>
      <Post post={reels} />
    </>
  );
}
