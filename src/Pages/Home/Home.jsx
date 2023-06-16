import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserPost from "../../Components/UserPost/UserPost";
import { useUserDataQuery } from "../../Redux/Query/userDataQuery";
import Cookies from "js.cookie";
import { userData } from "../../Redux/Slice/UserProfileSlice";
import { NotificationsTrigger } from "../../Components/ChatApp/Notification";
import Share from "../../Components/Share/Share";
import "./home.scss";

const Home = () => {
  const notification = useSelector((state) => state.user);
  const mode = useSelector((state) => state.theme.darkMode);
  const {
    data: userInfo,
    isLoading: isFetchingUserData,
    error: userDataFetchingError,
    refetch: refetchUserData,
  } = useUserDataQuery();
  const dispatch = useDispatch();

  const fetchData = () => {
    refetchUserData(Cookies.get("id"));
    console.log(userInfo, ";;;;;;;;;;;;;;;");
  };

  useEffect(() => {
    fetchData();
  }, [userInfo, notification]);

  return (
    <div className="home">
      <div className="notification">
        <NotificationsTrigger />
      </div>
      <Share />
      <UserPost home={true} />
    </div>
  );
};

export default Home;
