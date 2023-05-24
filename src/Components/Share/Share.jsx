import { useSelector } from "react-redux";
import "./share.scss";
import { Avatar } from "@mui/material";


const Share = () => {

  const user = useSelector(state=>state.user)
  const API_URL = import.meta.env.VITE_API_URL

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          {user.profile?(          <img
            src={`${API_URL}/${user.profile}`}
            alt=""
          />):<Avatar>{user.username[0]}</Avatar>}

          <input type="text" placeholder={`What's on your mind ${user.username}?`} />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{display:"none"}} />
            <label htmlFor="file">
              <div className="item">
                <img src="" alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src="" alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src="" alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;