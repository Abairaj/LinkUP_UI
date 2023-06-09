import React from "react";
import { useSelector } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";


import Navbar from "./Components/Navbar/Navbar";
import LeftBar from "./Components/leftBar/LeftBar";
import RightBar from "./Components/rightBar/RightBar";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/User_Profile/Profile";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Preloader from "./Components/Preloader/Preloader";
import EditProfile from "./Components/EditProfile/EditProfile";
import AdminHome from "./Pages/Admin/adminHome/AdminHome";
import Usertable from "./Pages/Admin/adminUserManagement/Usertable";
import AdminReports from "./Pages/Admin/AdminReports/AdminReports";
import Chattapp from "./Components/ChatPage/Chattapp";
import VerifyOTP from "./Components/OTP/VerifyOTP";
import VideoCall from "./Components/VedioCall/VedioCall";
import VideoCallAgora from "./Components/VedioCall/vedioCallAgora";
import VedioCallWebrtc from "./Components/VedioCall/vedioCallWebrtc";
import ZegocloudVideo from "./Components/VedioCall/ZegocloudVideo";
import UserPost from "./Components/UserPost/UserPost";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";


function App() {

  const darkMode = useSelector((state) => state.theme.darkMode);


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
            <Outlet admin={true} />0{" "}
          </div>
        </div>
      </div>
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
          element: <UserPost reels={true} />,
        },
        {
          path: "/explore",
          element: <UserPost explore={true} />,
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
      path: "/video_call/:id",
      element: <VideoCallAgora />,
    },
    {
      path: "/verify_otp",
      element: <VerifyOTP />,
    },
    {
      path: "/video_call_web",
      element: <VideoCall />,
    },
    {
      path: "/test",
      element: <VedioCallWebrtc />,
    },
    {
      path: "/zego/:roomId",
      element: <ZegocloudVideo />,
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);

  return (
    <RouterProvider router={router}>
    </RouterProvider>
  );
}

export default App;
