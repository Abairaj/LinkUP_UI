import React, { useState } from "react";
import "./post.scss";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Link } from "react-router-dom";
import Comments from "../Comments/Comments";
import { Avatar } from "@mui/material";
import { getDuration } from "../helpers";
import axiosInstance from "../../axosInstance";
import { useSelector } from "react-redux";
import Comp from "./moreComp";

const Post = ({ post, loading, fetchPost }) => {
  const [like, setLike] = useState(false);

  const handleLikeUnlike = (post_id) => {
    axiosInstance
      .post(`/post/Post_like/${user.id}`, { post_id: post_id })
      .then((response) => {
        if (response) {
          alert(response);
          setLike(!like);
        } else {
          alert("error like");
        }
      });
  };

  const user = useSelector((state) => state.user);

  const [commentOpen, setCommentOpen] = useState(false);

  return (
    <>
      {!loading ? (
        post && post.length > 0 ? (
          post.map((posts, i) => (
            <div key={posts.post_id} className="post">
              <div className="container">
                <div className="user">
                  <div className="userInfo">
                    {posts.user.profile ? (
                      <img src={posts.user.profile} alt="" />
                    ) : (
                      <Avatar>{posts.user.username[0]}</Avatar>
                    )}

                    <div className="details">
                      <Link
                        to={`/profile/${posts.user.id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <span className="name">{posts.user.username}</span>
                      </Link>
                      <span className="date">
                        {getDuration(posts.created_at)}
                      </span>
                    </div>
                  </div>
                  <div className="more_button">
                    <Comp user={posts.user} post_id={posts.post_id} />
                  </div>
                </div>
                <div className="content">
                  <p>{posts.caption}</p>
                  {posts.media_type === "Image" ? (
                    <img src={posts.media_url} alt="post" />
                  ) : (
                    <video src={posts.media_url} controls autoPlay muted />
                  )}
                  <img src="" alt="" />
                </div>
                <div className="info">
                  <div className="item">
                    <div>
                      <Checkbox
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                        checked={posts && posts.likes.includes(user.id)}
                        onChange={() => handleLikeUnlike(posts.post_id)}
                      />
                    </div>
                  </div>
                  <div
                    className="item"
                    onClick={() => setCommentOpen(!commentOpen)}
                  >
                    <TextsmsOutlinedIcon />
                    Comments
                  </div>
                  <div className="item">
                    <ShareOutlinedIcon />
                    Share
                  </div>
                </div>
                {commentOpen && <Comments post={posts} />}
              </div>
            </div>
          ))
        ) : (
          <div>No post</div>
        )
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Post;
