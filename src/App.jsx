import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import './styles.scss'
import {
  createBrowserRouter as Router,
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

function App() {
  const currentUser = true;

  const Layout = () => {
    return (
      <div className="theme-dark">
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{flex:6}}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to={"/login"} />;
    }
    return children;
  };

  const router = Router([
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
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
