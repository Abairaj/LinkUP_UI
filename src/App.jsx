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
import Videos from "./Components/Videos/VIdeos";
import Usertable from "./Pages/Admin/adminUserManagement/Usertable";
import Explore from "./Components/Explore/Explore";
import EditProfile from "./Components/EditProfile/EditProfile";
import { useUserDataQuery } from "./Redux/Query/userDataQuery";
import AdminHome from "./Pages/Admin/adminHome/AdminHome";
import AdminReports from "./Pages/Admin/AdminReports/AdminReports";

function App() {
  const {
    data: userInfo,
    isLoading: isFetchingUserData,
    error: userDataFetchingError,
    refetch: refetchUserData,
  } = useUserDataQuery(Cookies.get("id"));
  console.log(userInfo, "userdata");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [currentUser, setCurrentUser] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await refetchUserData(Cookies.get("id"));
        console.log(userInfo, "user data is here");

        if (userInfo) {
          setCurrentUser(true);
          setLoading(false);
          dispatch(userData(userInfo));
        } else if (userDataFetchingError) {
          setCurrentUser(false);
        } else {
          setCurrentUser(false);
        }
      } catch (error) {
        setCurrentUser(false);
      }
    };

    fetchData();
  }, [userInfo]);

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

  const AdminLayout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar admin={true} />
        <div style={{ display: "flex" }}>
          <LeftBar Is_admin={true} />
          <div style={{ flex: 9 }}>
            <Outlet admin={true} />
          </div>
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (loading || isFetchingUserData) {
      return "Loading...";
    }

    if (!currentUser) {
      return <Navigate to="/login" />;
    }

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
          element: <Profile myprofile={true} />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/profile_edit",
          element: <EditProfile />,
        },
        {
          path: "/reels",
          element: <Videos />,
        },
        {
          path: "/explore",
          element: <Explore />,
        },
      ],
    },
    {
      path: "/admin_dashboard",
      element: <AdminLayout />,
      children: [
        {
          path: "", // No need to repeat "admin_dashboard" here
          element: <AdminHome />,
        },
        {
          path: "admin_user",
          element: <Usertable />,
        },
        
        {
          path: "admin_reports",
          element: <AdminReports/>,
        },
      ],
    },
    {
      path: "/admin",
      element: <Login admin={true} />,
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
      path: "*",
      element: <Videos />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
