import { useSelector } from "react-redux";
import "./share.scss";
import { Avatar } from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import VideoCameraFrontOutlinedIcon from "@mui/icons-material/VideoCameraFrontOutlined";
import { useState } from "react";
import axios from "axios";
import Cookies from "js.cookie";
import { useDispatch } from "react-redux";
import { shareStatus } from "../../Redux/Slice/ShareSuccessSlice";

const Share = () => {
  const user = useSelector((state) => state.user);
  const [caption, setCaption] = useState("");
  const [media, setMedia] = useState();
  const API_URL = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();

  const handleShare = () => {
    let media_type;
    // Determine media_type based on selectedPost (assuming it contains the filename)
    const fileExtension = media.name
      .slice(media.name.lastIndexOf("."))
      .toLowerCase();
    if ([".mp4", ".avi", ".mov"].includes(fileExtension)) {
      media_type = "Video";
    } else if (
      [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(fileExtension)
    ) {
      media_type = "Image";
    }
    console.log(media, ".......", caption, ".........", location);

    let formdata = {
      media_url: media,
      caption: caption,
      media_type: media_type,
      user: Cookies.get("id"),
    };
    axios
      .post(`${API_URL}/post/create_post/${Cookies.get("id")}`, formdata, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        dispatch(shareStatus());
        setMedia("");
        setCaption("");
      });
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          {user.profile ? (
            <img
              className="profile_img"
              src={`${API_URL}/${user.profile}`}
              alt=""
            />
          ) : (
            <Avatar>{user.username[0]}</Avatar>
          )}
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder={`What's on your mind ${user.username}?`}
          />
          {media && (
            <img
              className="selected_image"
              src={URL.createObjectURL(media)}
              alt=""
            />
          )}
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              onChange={(e) => setMedia(e.target.files[0])}
              id="image"
              accept="image/*"
              style={{ display: "none" }}
            />
            <label htmlFor="image">
              <div className="item">
                <AddAPhotoOutlinedIcon />
                <span>Add Image</span>
              </div>
            </label>
            <input
              type="file"
              onChange={(e) => setMedia(e.target.files[0])}
              accept="video/*"
              id="video"
              style={{ display: "none" }}
            />
            <label htmlFor="video">
              <div className="item">
                <VideoCameraFrontOutlinedIcon />
                <span>Add Reels</span>
              </div>
            </label>
            {/* <div className="item">
              <img src="" alt="" />
              <span>Tag Friends</span>
            </div> */}
          </div>
          <div className="right">
            <button onClick={handleShare}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
