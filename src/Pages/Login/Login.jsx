import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import Cookies from "js.cookie";
import { userData } from "../../Redux/Slice/UserProfileSlice";
import { useDispatch } from "react-redux";

const Login = ({ admin }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [formError, setFormError] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const onFormsubmit = (data) => {
    const url = admin ? "admin/" : "/users/login/";

    axios
      .post(`${API_URL}/${url}`, data)
      .then((response) => {
        if (response.status === 200) {
          dispatch(userData(response.data.user))
          console.log(response.data.user);
          Cookies.remove("token");
          Cookies.remove("id");
          Cookies.set("token", response.data.token);
          Cookies.set("id", response.data.id);
          {
            admin ? navigate("/admin_dashboard") : navigate("/");
          }
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setFormError("username or password not valid");
        } else if (error.response.status === 403) {
          setFormError(error.response.data.message);
        } else {
          setFormError("an error occured please try again later");
        }
      });
  };

  return (
    <div className="login">
      <div className="card">
        {" "}
        <div className="left">
          <h1>LinkUp</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
            laborum repellat veritatis expedita aliquam obcaecati rerum,
            doloremque cum, non excepturi libero. Nesciunt, fuga?
          </p>
          <span>Dont you have an Account?</span>
          <Link to={"/register"}>
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>{admin && "Admin "}Login</h1>
          <p className="error">{formError}</p>
          <form onSubmit={handleSubmit(onFormsubmit)}>
            <input
              type="text"
              className="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                  message: "Invalid email format",
                },
              })}
              placeholder="Email"
            />
            <p className="errors">{errors.email?.message}</p>
            <input
              type="password"
              {...register("password", {
                required: "Password Field can't be empty",
              })}
              placeholder="password"
            />
            <p className="error">{errors.password?.message}</p>
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
