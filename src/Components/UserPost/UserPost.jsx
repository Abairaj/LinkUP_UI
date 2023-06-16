import React, { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../axosInstance";
import Post from "../Post/Post";
import { useSelector } from "react-redux";
import './userpost.scss'

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

  
  const [like, setLike] = useState(false);



  const loadPost = (update = null) => {
    console.log('load post working..............')

    axiosInstance
      .get(`/post/posts/${user.id}?filter=${filter}&limit=${limit}&offset=${offset}`)
      .then((response) => {
        const newPosts = response.data.post; // Assuming response.data contains the array of posts
        const postCount = response.data.postCount;
        console.log(response);

        setPostCount(postCount);
        setLoading(false);
        if (update = 'like'){
          setPosts(newPosts)

        }else{
        setPosts((prevPosts) => [
          ...prevPosts,
          ...newPosts.filter(
            (newPost) =>
              !prevPosts.some((post) => post.post_id === newPost.post_id)
          ),
        ]);
        }

        setLimit((prevlimit) => prevlimit + limit);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };



  const handleLikeUnlike = (post_id) => {
    axiosInstance
      .post(`/post/Post_like/${user.id}`, { post_id: post_id })
      .then((response) => {
        if (response) {
          console.log(response);
          setLike(!like);
          loadPost();
        } else {
        console.log("error like");
        }
      });
  };



  const handleDeletePost = (post_id) => {
    console.log(post_id);
    axiosInstance
      .patch(`post/create_post/${post_id}`)
      .then((response) => {
        console.log(response);
        alert("deleted");
      })
      .catch((error) => {
        console.log(error);
        loadPost();
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
    <div className="userpost">
      <Post post={posts} loading={loading} handleLikeUnlike={handleLikeUnlike} handleDeletePost={handleDeletePost} />
      {loading && <p>Loading...</p>}
      {!loading && postCount === posts.length && <p>No more posts.</p>}
    </div>
  );
};

export default UserPost;
