import React from "react";
import { ImageList, ImageListItem } from "@mui/material";
import NoCOmponenet from "../../Components/NoComponent/NoCOmponenet";

const ProfilePosts = ({ posts }) => {
  return (
    <div style={{ width: "100%" }}>
      <ImageList
        sx={{ width: "100%", height: "auto" }}
        cols={3}
        rowHeight={164}
      >
        {posts ? (
          posts.map((item) => (
            <ImageListItem key={item.post_id} sx={{ margin: "2px" }}>
              {item?.media_type === "Image" ? (
                <img
                  src={`${item.image}?w=164&h=200&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.caption}
                  loading="lazy"
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              ) : (
                <video
                  src={`${item.video}?w=164&h=200&fit=crop&auto=format`}
                  srcSet={`${item.video}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.caption}
                  // loading="lazy"
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              )}
            </ImageListItem>
          ))
        ) : (
          <div className="no_profilepost">
            <NoCOmponenet />
          </div>
        )}
      </ImageList>
    </div>
  );
};

export default ProfilePosts;
