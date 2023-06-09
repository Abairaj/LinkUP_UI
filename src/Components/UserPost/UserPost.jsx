import React, { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../AxiosQueries/axosInstance";
import Post from "../Post/Post";
import { useSelector } from "react-redux";

const UserPost = ({home,explore,reels}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(true);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);
  const user = useSelector((state) => state.user);
  const shareSuccess = useSelector(state=>state.shareSuccess)
  const filter = home ? 'home' : explore ? 'all' : reels ?'reels':'';

  
  const loadPost = () => {

    axiosInstance
      .get(`/post/posts/${user.id}?filter=${filter}&limit=${limit}&offset=${offset}`)
      .then((response) => {
        const newPosts = response.data.post; // Assuming response.data contains the array of posts
        const postCount = response.data.postCount;
        console.log(response);

        setPostCount(postCount);
        setLoading(false);
        setPosts((prevPosts) => [
          ...prevPosts,
          ...newPosts.filter(
            (newPost) =>
              !prevPosts.some((post) => post.post_id === newPost.post_id)
          ),
        ]);
        setLimit((prevlimit) => prevlimit + limit);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadPost();
  }, [shareSuccess,filter]);

  window.onscroll = () => {
    if (error || loading || posts.length == postCount) return;
  
    const isScrolledToBottom =
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight;
  
    if (isScrolledToBottom) {
      loadPost();
    }
  };
  

  return (
    <div>
      <Post post={posts} loading={loading} fetchPost={loadPost} />
      {loading && <p>Loading...</p>}
      {!loading && postCount === posts.length && <p>No more posts.</p>}
    </div>
  );
};

export default UserPost;
