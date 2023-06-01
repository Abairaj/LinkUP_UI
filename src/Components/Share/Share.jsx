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
import axiosInstance from "../../AxiosQueries/axosInstance";

const Share = () => {
  const user = useSelector((state) => state.user);
  const [caption, setCaption] = useState("");
  const [media, setMedia] = useState();
  const API_URL = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();

  const findMediatype = (mediafile) => {
    let media_type;
    const fileExtension = mediafile.name
      .slice(mediafile.name.lastIndexOf("."))
      .toLowerCase();
    if ([".mp4", ".avi", ".mov"].includes(fileExtension)) {
      return (media_type = "Video");
    } else if (
      [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(fileExtension)
    ) {
      return (media_type = "Image");
    }
  };
  const media_type = media && findMediatype(media);

  const handleShare = () => {
    let media_type = findMediatype(media);
    // Determine media_type based on selectedPost (assuming it contains the filename)
    // const fileExtension = media.name
    //   .slice(media.name.lastIndexOf("."))
    //   .toLowerCase();
    // if ([".mp4", ".avi", ".mov"].includes(fileExtension)) {
    //   media_type = "Video";
    // } else if (
    //   [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(fileExtension)
    // ) {
    //   media_type = "Image";
    // }
    console.log("data loading");

    let formdata = {
      media_url: media,
      caption: caption,
      media_type: media_type,
      user: Cookies.get("id"),
    };
    console.log(formdata);

    axiosInstance
      .post(`/post/create_post/${Cookies.get("id")}`, formdata, {
        headers: {
          "content-type": "multipart/form-data",
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
          {media && media_type == "Image" ? (
            <img
              className="selected_image"
              src={URL.createObjectURL(media)}
              alt=""
            />
          ) : (
            media_type == "Video" && (
              <video
                className="selected_image"
                src={URL.createObjectURL(media)}
                alt=""
              />
            )
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
