import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import LeftBar from "./Components/leftBar/LeftBar";
import RightBar from "./Components/rightBar/RightBar";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/User_Profile/Profile";
import "./styles.scss?inline";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js.cookie";
import { useDispatch } from "react-redux";
import { userData } from "./Redux/Slice/UserProfileSlice";
import Post from "./Components/Post/Post";
import Reels from "./Components/Reels/Reels";
import Usertable from "./Pages/Admin/adminUserManagement/Usertable";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user)
  const [currentUser, setCUrrentUser] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${API_URL}/users/auth/${Cookies.get("id")}`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      })
      .then((response) => {
        if (response) {
          setCUrrentUser(true);
          setLoading(false);
          dispatch(userData(response.data));
        } else {
          setCUrrentUser(false);
        }
      })
      .catch((error) => {
        console.log(error)
        setCUrrentUser(false);
        // setLoading(false);
      });
  },[]);
  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  const AdminLayout = () =>{
    return(
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <Navbar admin={true}/>
      <div style={{ display: "flex" }}>
        <LeftBar admin={true}/>
        <div style={{ flex: 9 }}>
          <Outlet admin={true} />
        </div>
      </div>
    </div>
    )
  }

  const ProtectedRoute = ({ children }) => {

    if (loading) {
      return "Loading..."; // Display a loading indicator
    }

    if (!currentUser) {
      return <Navigate to="/login" />; // Redirect to the login page
    }
    setLoading(false)
    return children;
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/my_profile",
          element: <Profile myprofile={true}/>,
        },
        {
          path: "/profile/:id",
          element: <Profile/>,
        },
      ],
    },
    {
      path:"/admin_dashboard",
      element:(
        <AdminLayout/>
      ),
      children:[
        {
          path:"admin_dashboard",
          element:<Home/>
        }
      ]
    },
    {
      path:"/admin",
      element:<Login admin = {true}/>

    },
    ,
    {
      path:"/admin_user",
      element:<Usertable/>

    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path:"/reels",
      element:<Reels/>

    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
