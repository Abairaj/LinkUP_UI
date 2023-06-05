import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import axios from "axios";
import Cookies from "js.cookie";
import { useSelector } from "react-redux";
import axiosInstance from "../../AxiosQueries/axosInstance";

export default function Explore() {
  const [explorePost, setExplorePost] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setExplorePost([]);
    setPage(1);
  }, []);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/post/all_posts/?page=${page}`)
      .then((response) => {
        if (response.data.results) {
          setExplorePost((prevPosts) => [
            ...prevPosts,
            ...response.data.results,
          ]);
          setLoading(false);
          setHasMore(response.data.next !== null); // Check if there is a next page
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [page]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollHeight - scrollTop === clientHeight && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, loading]);

  return (
    <>
      <Post post={explorePost} loading={loading} />
    </>
  );
}
