import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import ReportReason from "../ReportReason/ReportReason";
import Cookies from "js.cookie";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function Comp({ post_id, user, handleDeletePost }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMore, setOpenMore] = useState(false);
  const handlePopoverClose = () => {
    setOpenMore(false);
  };

  const handlePopoverOpen = (event) => {
    setOpenMore(!openMore);
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
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
          {user.id === Cookies.get("id") ? (
            <span
              style={{
                cursor: "pointer",
                padding: "10px",
                color: "red",
              }}
              onClick={() => handleDeletePost(post_id)}
            >
              Delete
            </span>
          ) : (
            <ReportReason
              post_id={post_id}
              reporting_user={Cookies.get("id")}
              reported_user={user.id}
            />
          )}
        </Typography>
      </Popover>
    </div>
  );
}

export default Comp;
