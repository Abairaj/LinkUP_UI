import React from "./rightBar.scss?inline";

const RightBar = () => {
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions for You</span>
          <div className="user">
            <div className="userinfo">
              <img src="" alt="" />
              <span>Abairaj.K</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
        </div>

        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userinfo">
              <img src="" alt="" />
              <span>Abairaj.K</span>
            </div>
            <div className="buttons">
             <span>1 minite ago</span>
            </div>
          </div>{" "}
          <div className="user">
            <div className="userinfo">
              <img src="" alt="" />
              <span>Abairaj.K</span>
            </div>
            <div className="buttons">
              <span>2 minute ago</span>
            </div>
          </div>
        </div>
        <div className="item">
            <span>online friends</span>
            <div className="user">
            <div className="userinfo">
              <img src="" alt="" />
              <div className="online"/>
              <span>Abairaj.K</span>
            </div>
       
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
