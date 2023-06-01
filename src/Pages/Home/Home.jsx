import Stories from "../../Components/Stories/Stories";
import Share from "../../Components/Share/Share";
import "./home.scss";
import { useDispatch, useSelector } from "react-redux";
import UserPost from "../../Components/UserPost/UserPost";
import { useUserDataQuery } from "../../Redux/Query/userDataQuery";
import Cookies from 'js.cookie';
import { userData } from "../../Redux/Slice/UserProfileSlice";
import { useEffect } from "react";
const Home = () => {
  const mode = useSelector((state) => state.theme.darkMode);
  const {
    data: userInfo,
    isLoading: isFetchingUserData,
    error: userDataFetchingError,
    refetch: refetchUserData,
  } = useUserDataQuery();
  const dispatch = useDispatch()

  const fetchData=()=>{

    refetchUserData(Cookies.get('id'));
    dispatch(userData(userInfo));
    console.log(userData)


  }



  useEffect(()=>{
    fetchData();
  },[userInfo])
  return (
    <div className="home">
      <Stories />
      <Share />
      <UserPost />
    </div>
  );
};

export default Home;
