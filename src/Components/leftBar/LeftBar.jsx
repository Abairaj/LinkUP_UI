import "./leftBar.scss";
import friend from "./../../assets/friend.png";

const LeftBar = () => {
  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img
              src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80"
              alt=""
            />
            <span>AbaiRaj.K</span>
          </div>
          <div className="item">
            <img src={friend} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={friend} alt="" />
            <span>Followers</span>
          </div>
          <div className="item">
            <img src={friend} alt="" />
            <span>Following</span>
          </div>
          <div className="item">
            <img src={friend} alt="" />
            <span>Reels</span>
          </div>
          <div className="item">
            <img src={friend} alt="" />
            <span>Notifications</span>
          </div>
   
        </div>
        <hr />
        <div className="menu">
          <span>Your Shortcuts</span>
          <div className="item">
            <img src={friend} alt="" />
            <span>Friends</span>
          </div>{" "}
          <div className="item">
            <img src={friend} alt="" />
            <span>Friends</span>
          </div>{" "}
          <div className="item">
            <img src={friend} alt="" />
            <span>Friends</span>
          </div>{" "}
          <div className="item">
            <img src={friend} alt="" />
            <span>Friends</span>
          </div>{" "}
          <div className="item">
            <img src={friend} alt="" />
            <span>Friends</span>
          </div>{" "}
          <div className="item">
            <img src={friend} alt="" />
            <span>Friends</span>
          </div>
        </div>
        <hr />
        <div className="menu">
            <span>Others</span>
            <div className="item">
            <img src={friend} alt="" />
            <span>Friends</span>
          </div>         <div className="item">
            <img src={friend} alt="" />
            <span>Friends</span>
          </div>         <div className="item">
            <img src={friend} alt="" />
            <span>Friends</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
