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

const Post = ({ post }) => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [commentOpen, setCommentOpen] = useState(false);
  

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




  //TEMPORARY
  const liked = false;

  return (
    <>
      {post&&post.length > 0
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
                        to={`/profile/${post.user.id}`}
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
                    onClick={() =>setCommentOpen(!commentOpen) }
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
