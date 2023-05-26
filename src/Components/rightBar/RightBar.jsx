import "./rightBar.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js.cookie";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RightBar = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [UserSuggestion, setUserSuggestion] = useState([]);
  const myUser = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSuggestion();
  }, []);
  const fetchSuggestion = () => {
    axios
      .get(`${API_URL}/users/user_suggestion/`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      })
      .then((response) => {
        setUserSuggestion(response.data);
        console.log(response.data, "llllllllllll");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const followUser = (id) => {
    const formData = { user_id: id };
    axios
      .post(`${API_URL}/users/follow/${Cookies.get("id")}`, formData, {
        headers: { Authorization: `Bearer${Cookies.get("token")}` },
      })
      .then((response) => {
        console.log(response);
      });
  };

  const UnfollowUser = (id) => {
    const formData = { user_id: id };
    axios
      .post(`${API_URL}/users/unfollow/${Cookies.get("id")}`, formData, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions for You</span>
          {UserSuggestion.length > 0 &&
            UserSuggestion.map((user) => (
              <div key={user.id} className="user">
                <div className="userinfo">
                  <img src="" alt="" />
                  <Link
                    to={`/profile/${user.id}`}
                    style={{ cursor: "pointer", textDecoration: "none" }}
                  >
                    <span>{user.username}</span>
                  </Link>
                </div>
                <div className="buttons">
                  {myUser.following.includes(user.id) ? (
                    <button onClick={() => followUser(user.id)}>Follow</button>
                  ) : (
                    <button onClick={() => UnfollowUser(user.id)}>
                      Unfollow
                    </button>
                  )}
                  <button>Dismiss</button>
                </div>
              </div>
            ))}
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
              <div className="online" />
              <span>Abairaj.K</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
