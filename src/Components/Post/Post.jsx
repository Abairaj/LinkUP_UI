import React, { useCallback, useState } from "react";
import "./post.scss";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../Comments/Comments";
import { Avatar } from "@mui/material";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import ReportReason from "../ReportReason/ReportReason";
import Cookies from "js.cookie";
import axiosInstance from "../../AxiosQueries/axosInstance";
import { useSelector } from "react-redux";

const Post = ({ post, loading, fetchPost }) => {
  const [like, setLike] = useState(false);

  const handleDeletePost = (post_id) => {
    axiosInstance
      .patch(`post/create_post/${post_id}`)
      .then((response) => {
        console.log(response);
        alert("deleted");
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

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

  // useCallback(() => fetchPost(), [like]);

  const API_URL = import.meta.env.VITE_API_URL;
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMore, setOpenMore] = useState(false);
  const user = useSelector((state) => state.user);

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

  const handlePopoverOpen = (event) => {
    setOpenMore(!openMore);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setOpenMore(false);
  };

  return (
    <>
      {!loading ? (
        post && post.length > 0 ? (
          post.map((post) => (
            <div key={post.post_id} className="post">
              <div className="container">
                <div className="user">
                  <div className="userInfo">
                    {post.user.profile ? (
                      <img src={post.user.profile} alt="" />
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
                  <div className="more_button">
                    <Typography
                      aria-owns={openMore ? "mouse-over-popover" : undefined}
                      aria-haspopup="true"
                      onClick={handlePopoverOpen}
                    >
                      <MoreHorizIcon sx={{ cursor: "pointer" }} />
                    </Typography>
                    <Popover
                      id="mouse-over-popover"
                      open={openMore}
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      onClose={handlePopoverClose}
                      disableRestoreFocus
                    >
                      <Typography
                        sx={{
                          p: 2,
                          display: "flex",
                          flexDirection: "column",
                          backgroundColor: "transparent",
                        }}
                      >
                        <span
                          style={{
                            cursor: "pointer",
                            padding: "10px",
                            color: "red",
                          }}
                          onClick={() => handleDeletePost(post.post_id)}
                        >
                          Delete
                        </span>
                        <ReportReason
                          post_id={post.post_id}
                          reporting_user={Cookies.get("id")}
                          reported_user={post.user.id}
                        />
                      </Typography>
                    </Popover>
                  </div>
                </div>
                <div className="content">
                  <p>{post.caption}</p>
                  {post.media_type === "Image" ? (
                    <img src={post.media_url} alt="post" />
                  ) : (
                    <video src={post.media_url} controls autoPlay muted />
                  )}
                  <img src="" alt="" />
                </div>
                <div className="info">
                  <div className="item">
                    {/* {liked ? (
                      <FavoriteOutlinedIcon />
                    ) : (
                      <FavoriteBorderOutlinedIcon />
                    )}
                    {post.likes.length} */}
                    <div>
                      <Checkbox
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                        checked={post && post.likes.includes(user.id)}
                        onChange={() => handleLikeUnlike(post.post_id)}
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
                {commentOpen && <Comments post={post} />}
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
