import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../Comments/Comments";
import { useState } from "react";
import { Avatar } from "@mui/material";
import axios from "axios";
import Cookies from 'js.cookie'
import { useFetchCommentQuery,useCreateCommentMutation } from "../../Redux/Query/CommentQuery";

const Post = ({ post }) => {
  const { data, error, isLoading,refetch } = useFetchCommentQuery();
  const API_URL = import.meta.env.VITE_API_URL;

  const [commentOpen, setCommentOpen] = useState(false);
  const [comments,setComments] = useState()

  // to show hours ago and days ago
  const getDuration = (created_at) => {
    const currentTime = new Date();
    const postTime = new Date(created_at);
    const timeDiff = currentTime - postTime;
    const duration = Math.floor(timeDiff / (1000 * 60 * 60));
    const daysAgo = Math.floor(duration / 24);

    if (daysAgo > 0) {
      return `${daysAgo}d`;
    } else if (duration === 0) {
      return "Just now";
    } else if (duration === 1) {
      return "1h";
    } else {
      return `${duration}h`;
    }
  };


  // const fetchComment = (post_id) =>{
  //   // setCommentOpen(!commentOpen)
  //   // const formData = {post_id:post_id}
  //   // axios.get(`${API_URL}/post/get_comment/`,formData,{headers:{Authorization:`Bearer ${Cookies.get('token')}`}}).then((response)=>{
  //   //   setComments(response.data)
  //   //   console.log(response,'////////////////')
  //   // })


    
  // }


  const fetchComment = (post_id) => {
    setCommentOpen(!commentOpen)
    // Fetch comments using the useFetchCommentQuery hook
  refetch(post_id);

    if (isLoading) {
      // Show loading state
    } else if (error) {
      // Handle error
    } else if (data) {
      // Process the fetched comments in `data` variable
      console.log(data, "//////////////////////");
    }
  };




  console.log(post);
  //TEMPORARY
  const liked = false;

  return (
    <>
      {post.length > 0
        ? post.map((post) => (
            <div key={post.post_id} className="post">
              <div className="container">
                <div className="user">
                  <div className="userInfo">
                    {post.user.profile ? (
                      <img src={`${API_URL}/${post.user.profile}`} alt="" />
                    ) : (
                      <Avatar>{post.user.username[0]}</Avatar>
                    )}

                    <div className="details">
                      <Link
                        to={`/profile/${"post.user.id"}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <span className="name">{post.user.username}</span>
                      </Link>
                      <span className="date">
                        {getDuration(post.created_at)}
                      </span>
                    </div>
                  </div>
                  <MoreHorizIcon />
                </div>
                <div className="content">
                  <p>{post.caption}</p>
                  {post.media_type === "Image" ? (
                    <img src={`${API_URL}/${post.media_url}`} alt="post" />
                  ) : (
                    <video
                      src={`${API_URL}/${post.media_url}`}
                      controls
                      autoPlay
                      muted
                    />
                  )}
                  <img src="" alt="" />
                </div>
                <div className="info">
                  <div className="item">
                    {liked ? (
                      <FavoriteOutlinedIcon />
                    ) : (
                      <FavoriteBorderOutlinedIcon />
                    )}
                    {post.likes.length}
                  </div>
                  <div
                    className="item"
                    onClick={() =>fetchComment(post.post_id) }
                  >
                    <TextsmsOutlinedIcon />
                    {post.post_id}
                    12 Comments
                  </div>
                  <div className="item">
                    <ShareOutlinedIcon />
                    Share
                  </div>
                </div>
                {commentOpen && <Comments post = {post} />}
              </div>
            </div>
          ))
        : "No post"}
    </>
  );
};

export default Post;
