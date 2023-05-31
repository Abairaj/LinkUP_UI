import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import axios from "axios";
import Cookies from "js.cookie";
import './videos.scss'

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
        setReels(response.data);
      })
      .catch((errors) => {
        alert(errors);
      });
  };
  return (
    <div className="videos">
      <Post post={reels} />
    </div>
  );
}
