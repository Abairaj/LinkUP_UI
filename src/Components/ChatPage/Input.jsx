import React from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import PermMediaIcon from "@mui/icons-material/PermMedia";

const Input = () => {
  return (
    <div className="input">
      <input type="text" placeholder="Type something..." />
      <div className="send">
        {/* <img src="" alt="img" /> */}
        <PermMediaIcon />
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          {/* <img src="" alt="attach" /> */}
          <AttachFileIcon />
        </label>
        <button>send</button>
      </div>
    </div>
  );
};

export default Input;
