import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import axios from "axios";
import Cookies from "js.cookie";

export default function Reels() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [reels, setReels] = useState([]);
  useEffect(() => {
    fetchReels();
  }, []);

  const fetchReels = () => {
    axios
      .get(`${API_URL}/post/reels?filter=reels`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      })
      .then((response) => setReels(response.data.data))
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
