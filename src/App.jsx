import React from "react";
import { useSelector } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
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
import VerifyOTP from "./Components/OTP/VerifyOTP";
import UserPost from "./Components/UserPost/UserPost";
import ProtectedRoute, {
  AdminProtectedRoute,
} from "./Components/ProtectedRoute/ProtectedRoute";
import { AlertProvider } from "./context/alertContext";
import { ChatLayout } from "./Components/ChatApp/Layouts";
import Chat from "./Components/ChatApp/Chat";
import VedioCall from "./Components/VedioCall/VedioCall";
import CallAlert from "./Components/VedioCall/Call Alert";
import { useSocket } from "./SocketProvider";
import { TriggerCall } from "./Components/ChatApp/Triggercall";

function App() {
  const user = useSelector((state) => state.user);
  const socket = useSocket();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
            <TriggerCall />
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
            <Outlet admin={true} />{" "}
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
      element: (
        <AdminProtectedRoute>
          {" "}
          <AdminLayout />{" "}
        </AdminProtectedRoute>
      ),
      children: [
        {
          path: "",
          element: <AdminHome />,
        },
        {
          path: "admin_user",
          element: <Usertable />,
        },
        {
          path: "admin_reports",
          element: (
            <AlertProvider>
              <AdminReports />
            </AlertProvider>
          ),
        },
      ],
    },
    {
      path: "/chat",
      element: <ChatLayout />,
      children: [
        {
          path: ":id",
          element: <Chat />,
        },
      ],
    },
    ,
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
      path: "/verify_otp",
      element: <VerifyOTP />,
    },
    {
      path: "/video_call_web/:id",
      element: <VedioCall />,
    },

    {
      path: "/preloader",
      element: <Preloader />,
    },
    {
      path: "/call_alert/:id",
      element: <CallAlert />,
    },

    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
