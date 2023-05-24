import Stories from "../../Components/Stories/Stories";
import Share from "../../Components/Share/Share";
import "./home.scss";
import { useSelector } from "react-redux";
import UserPost from "../../Components/UserPost/UserPost";

const Home = () => {
  const mode = useSelector((state) => state.theme.darkMode);

  return (
    <div className="home">
      <Stories />
      <Share />
      <UserPost />
    </div>
  );
};

export default Home;
