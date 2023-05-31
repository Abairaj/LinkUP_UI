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
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
const Post = ({ post,loading }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMore, setOpenMore] = useState(false);

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
    setOpenMore(true);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setOpenMore(false);
  };

  //TEMPORARY
  const liked = false;

  return (
    <>
      {!loading?post && post.length > 0
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
                  <div className="more_button">
                    <Typography
                      aria-owns={openMore ? "mouse-over-popover" : undefined}
                      aria-haspopup="true"
                      onMouseEnter={handlePopoverOpen}
                      onMouseLeave={handlePopoverClose}
                    >
                      <MoreHorizIcon />
                    </Typography>
                    <Popover
                      id="mouse-over-popover"
                      sx={{
                        pointerEvents: "none",
                        backgroundColor: "transparent", // Set background color to transparent
                      }}
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
                        <Link
                          style={{
                            textDecoration: "none",
                            cursor: "pointer",
                            padding: "5px",
                          }}
                        >
                          Delete
                        </Link>
                        <Link
                          style={{
                            textDecoration: "none",
                            cursor: "pointer",
                            padding: "5px",
                          }}
                        >
                          Report
                        </Link>
                      </Typography>
                    </Popover>
                  </div>
                </div>
                <div className="content">
                  <p>{post.caption}</p>
                  {post.media_type === "Image" ? (
                    <img src={post.media_url} alt="post" />
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
        : "No post":"loading....."}
    </>
  );
};

export default Post;
