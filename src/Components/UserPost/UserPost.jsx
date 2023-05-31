import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import axios from "axios";
import Cookies from "js.cookie";
import { useSelector } from "react-redux";

export default function UserPost() {
  const [allPost, setAllPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;
  const [page, setPage] = useState(1);
  const shareSuccess = useSelector((state) => state.shareSuccess);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollHeight - scrollTop === clientHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchAllPost();
  }, [shareSuccess,page]);

  const fetchAllPost = () => {
    setLoading(true);
    axios
      .get(`${API_URL}/post/all_posts/?page=${page}`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      })
      .then((response) => {
        if (response) {
          setAllPost((prevPosts) => [...prevPosts, ...response.data.results]);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
      });
  };

  return (
    <>
     
        <Post post={allPost} loading={loading} />
 
    </>
  );
}
