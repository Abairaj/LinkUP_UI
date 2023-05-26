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
import axios from "axios";

const Profile = ({ myprofile }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate()
  const myProfile = useSelector((state) => state.user);
  const [userData, setUserData] = useState([]);
  const { id } = useParams();
  const user = myprofile ? myProfile : userData;
  console.log(user,'lllllllllllllldddddddddddd')

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const fetchUserData = () => {
    axios
      .get(`${API_URL}/users/user_profile/${id}`)
      .then((response) => {
        setUserData(response.data.user);
      })
      .catch((error) => {
        alert(error);
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
        {user.profile ? (
          <img
            src={`${API_URL}/${user.profile}`}
            alt=""
            className="profilePic"
          />
        ) : (
          <img
            src={
              user.gender === "Male"
                ? male_contact
                : user.gender === "Female"
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
           
              <span>{user.username}</span>
       
            {/* <div className="info">
              <div className="item">
                <span>followers</span>
                      {user&&user.length>0?user.following.length:"0"}
              </div>
              <div className="item">
                <LanguageIcon />
                <span></span>
              </div>
            </div> */}

            <div className="user_info">
              <div className="item">
              <p>Followers</p>
              <span>0</span>
              </div>
              
              <div className="item">
              <p>Followers</p>
              <span>0</span>
              </div>
            </div>
            <div className="buttons">
            <button>follow</button>
            <button onClick={()=>navigate('/profile_edit')}>Edit</button>
            </div>
            
          </div>
          {/* <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div> */}
        </div>
        <Post />
      </div>
    </div>
  );
};

export default Profile;
