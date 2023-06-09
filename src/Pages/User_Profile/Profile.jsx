import "./profile.scss";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Post from "../../Components/Post/Post";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import male_contact from "../../assets/malecontact.png";
import female_contact from "../../assets/femalecontact.png";
import contact from "../../assets/contact.png";
import { useEffect, useState } from "react";
import axiosInstance from "../../AxiosQueries/axosInstance";
import Cookies from "js.cookie";
import ProfilePosts from "./ProfilePosts";

const Profile = ({ myprofile }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const myProfile = useSelector((state) => state.user);
  const [post, setPost] = useState([]);
  const [userData, setUserData] = useState(null);
  const { id } = useParams();
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
              {!myprofile && <button>Follow</button>}
              <button onClick={() => navigate("/profile_edit")}>Edit</button>
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
