import "./rightBar.scss";
import { useState, useEffect } from "react";
import Cookies from "js.cookie";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFollowUnfollowUserMutation } from "../../Redux/Query/followUnfollowQuery";
import { useUserSuggestionsQuery } from "../../Redux/Query/UserSuggestionsQuery";

const RightBar = () => {
  const [updateFollowStatus, result] = useFollowUnfollowUserMutation();
  const {
    data: suggestionData,
    error: UseSuggestionError,
    isLoading: SuggestionLoading,
    refetch: fetchUserSuggestion,
  } = useUserSuggestionsQuery();

  const [userSuggestions, setUserSuggestions] = useState([]);
  const myUser = useSelector((state) => state.user);

  const updateFollow = (userToFollow) => {
    const userId = Cookies.get("id");
    const formData = { user_id: userToFollow };
    updateFollowStatus({ user_id: userId, formData })
      .then(() => {
        fetchUserSuggestion(); // Refetch suggestion data after following/unfollowing
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (suggestionData) {
      setUserSuggestions(suggestionData);
    }
  }, [suggestionData]);

  useEffect(() => {
    fetchUserSuggestion();
  }, [myUser]);

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions for You</span>
          {userSuggestions &&
            userSuggestions.length > 0 &&
            userSuggestions.map((user) => (
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
                  {!user.followers.includes(myUser.id) ? (
                    <button onClick={() => updateFollow(user.id)}>
                      Follow
                    </button>
                  ) : (
                    <button onClick={() => updateFollow(user.id)}>
                      Unfollow
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
