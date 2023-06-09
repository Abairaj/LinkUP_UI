import React from "react";
import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import Preloader from "../Preloader/Preloader";
import axiosInstance from "../../AxiosQueries/axosInstance";
import Cookies from 'js.cookie';
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  const [currentUser, setCurrentUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  const checkAuth = () => {
    axiosInstance
      .get(`/users/user_profile/${Cookies.get("id")}`, {
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

  return loading ? (
    <Preloader />
  ) : currentUser ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
