import Stories from "../../Components/Stories/Stories"
import Post from "../../Components/Post/Post"
import Share from "../../Components/Share/Share"
import "./home.scss"
import { useSelector } from "react-redux"

const Home = () => {
  const mode = useSelector(state=>state.theme.darkMode)

  return (
    <div className="home">
      <Stories/>
      <Share/>
      <Post/>
    </div>
  )
}

export default Home