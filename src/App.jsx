import React, { useEffect, useState} from "react";
import { useSelector} from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Cookies from "js.cookie";
import axios from "axios";

import Navbar from "./Components/Navbar/Navbar";
import LeftBar from "./Components/leftBar/LeftBar";
import RightBar from "./Components/rightBar/RightBar";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/User_Profile/Profile";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Preloader from "./Components/Preloader/Preloader";
import EditProfile from "./Components/EditProfile/EditProfile";
import Videos from "./Components/Videos/VIdeos";
import Explore from "./Components/Explore/Explore";
import AdminHome from "./Pages/Admin/adminHome/AdminHome";
import Usertable from "./Pages/Admin/adminUserManagement/Usertable";
import AdminReports from "./Pages/Admin/AdminReports/AdminReports";
import Chattapp from "./Components/ChatPage/Chattapp";
function App() {

  const user = useSelector((state) => state.user);
  const [currentUser, setCurrentUser] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;
  const checkAuth = () => {
    axios
      .get(`${API_URL}/users/user_profile/${Cookies.get("id")}`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      })
      .then((response) => {
        if (response) {
          setCurrentUser(true);
          setLoading(false);
        } else {
          setCurrentUser(false);
        }
      })
      .catch((error) => {
        setCurrentUser(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    checkAuth();
  }, []);

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
            login
          </div>
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    return loading ? (
      <Preloader />
    ) : currentUser ? (
      children
    ) : (
      <Navigate to="/login" replace />
    );
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
          path: "/my_profile/:name",
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
          element: <AdminReports />,
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
      path: "/chat",
      element: <Chattapp />,
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);

  return (
    <RouterProvider router={router}>
      {loading ? <Preloader /> : <Outlet />}
    </RouterProvider>
  );
}

export default App;
