import React, { useState } from "react";
import "./post.scss";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import { Link } from "react-router-dom";
import Comments from "../Comments/Comments";
import { Avatar } from "@mui/material";
import { getDuration } from "../helpers";
import { useSelector } from "react-redux";
import Comp from "./moreComp";
import NoCOmponenet from "../NoComponent/NoCOmponenet";

const Post = ({ post, loading, handleLikeUnlike, handleDeletePost }) => {
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
                    <Comp
                      user={posts.user}
                      post_id={posts.post_id}
                      handleDeletePost={handleDeletePost}
                    />
                  </div>
                </div>
                <div className="content">
                  <p>{posts.caption}</p>
                  {posts.media_type === "Image" ? (
                    <img src={posts.image} alt="post" />
                  ) : (
                    <video src={posts.video} controls autoPlay muted />
                  )}
                  <img src="" alt="" />
                </div>
                <div className="info">
                  <div className="item">
                    <div>
                      <Checkbox
                        icon={<FavoriteBorderOutlinedIcon />}
                        checkedIcon={<FavoriteOutlinedIcon />}
                        checked={posts && posts.likes.includes(user.id)}
                        onChange={() => handleLikeUnlike(posts)}
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
                </div>
                {commentOpen && <Comments post={posts} />}
              </div>
            </div>
          ))
        ) : (
          <div>
            <NoCOmponenet/>
          </div>
        )
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Post;
