import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import TextField from "@mui/material/TextField";
const ChatApp = () => {
  return (
    <div className="chatusers" style={{ maxWidth: "800px" }}>
      <div className="userlist">
        <List
          // sx={{ width: "100vw",height:'100vh', maxWidth: 600, bgcolor: "background.paper" }}
        >
          <TextField
            // size="small"
            // placeholder="search User..."
            // type="text"
            // sx={{ width: "100%" }}
          />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Photos" secondary="Jan 9, 2014" />
          </ListItem>
        </List>
      </div>
    </div>
  );
};

export default ChatApp;
