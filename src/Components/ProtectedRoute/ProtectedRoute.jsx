import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../Preloader/Preloader";
import axiosInstance from "../../axosInstance";
import Cookies from "js.cookie";
import { Navigate } from "react-router-dom";
import { userData } from "../../Redux/Slice/UserProfileSlice";
import axios from "axios";
const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const checkAuth = () => {
    axiosInstance
      .get(`/users/auth/${Cookies.get("id")}/`)
      .then((response) => {
        if (response) {
          if (!response.data.is_admin) {
            console.log(response);
            setIsAuthenticated(true);
            dispatch(userData(response.data.data));
            setLoading(false);
          } else {
            setIsAuthenticated(false);
          }
        }
      })
      .catch((error) => {
        console.log(error, "this is error");
        setIsAuthenticated(false);
        console.log(loading);
        setLoading(false);
        console.log(isAuthenticated);
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
  ) : isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};

export const AdminProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const checkAuth = () => {
    axios
      .get(`${API_URL}/users/auth/${Cookies.get("id")}/`, {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      })
      .then((response) => {
        if (response.data.is_admin) {
          console.log(response);
          setIsAuthenticated(true);
          dispatch(userData(response.data));
          setLoading(false);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch((error) => {
        console.log(error, "this is error");
        setIsAuthenticated(false);
        console.log(loading);
        setLoading(false);
        console.log(isAuthenticated);
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
  ) : isAuthenticated ? (
    children
  ) : (
    <Navigate to="/admin" replace />
  );
};

export default ProtectedRoute;
