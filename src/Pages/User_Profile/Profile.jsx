import "./profile.scss";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import male_contact from "../../assets/malecontact.png";
import female_contact from "../../assets/femalecontact.png";
import contact from "../../assets/contact.png";
import { useEffect, useState } from "react";
import axiosInstance from "../../axosInstance";
import Cookies from "js.cookie";
import ProfilePosts from "./ProfilePosts";
import { useFollowUnfollowUserMutation } from "../../Redux/Query/followUnfollowQuery";

const Profile = ({ myprofile }) => {
  const navigate = useNavigate();
  const myProfile = useSelector((state) => state.user);
  const [post, setPost] = useState([]);
  const [userData, setUserData] = useState(null);
  const { id } = useParams();
  const [updateFollowStatus, result] = useFollowUnfollowUserMutation();
  const user = myprofile ? myProfile : userData;

  useEffect(() => {
    setPost("");
    fetchUserData();
    fetchPosts();
  }, [id]);

  const fetchUserData = () => {
    axiosInstance
      .get(`/users/user_profile/${id}`)
      .then((response) => {
        setUserData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchPosts = () => {
    axiosInstance.get(`/post/getpost/${id}`).then((response) => {
      if (response) {
        console.log(response);
        setPost(response.data);
      }
    });
  };

  const updateFollow = (userToFollow) => {
    const userId = Cookies.get("id");
    const formData = { user_id: userToFollow };
    updateFollowStatus({ user_id: userId, formData })
      .then(() => {
        fetchUserData(); // Refetch suggestion data after following/unfollowing
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        />
        {user && user.profile ? (
          <img src={user.profile} alt="" className="profilePic" />
        ) : (
          <img
            src={
              user && user.gender === "Male"
                ? male_contact
                : user && user.gender === "Female"
                ? female_contact
                : contact
            }
            alt=""
            className="profilePic"
          />
        )}
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="center">
            <span>{user && user.username}</span>
            <div className="user_info">
              <div className="item">
                <p>Followers</p>
                <span>{user?.followers?.length || 0}</span>
              </div>
              <div className="item">
                <p>Following</p>
                <span>{user?.following?.length || 0}</span>
              </div>
            </div>
            <div className="buttons">
              {user &&
              user.followers &&
              user.followers.includes(Cookies.get("id")) ? (
                <button onClick={() => updateFollow(user.id)}>Unfollow</button>
              ) : (
                <button onClick={() => updateFollow(user.id)}>Follow</button>
              )}

              {user?.id == Cookies.get("id") && (
                <button onClick={() => navigate("/profile_edit")}>Edit</button>
              )}
            </div>
          </div>
        </div>
        <div className="profile_posts">
          <ProfilePosts posts={post} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
