import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./register.scss";
import axios from  'axios'
import Cookies from 'js.cookie'

const Register = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;



  const onFormSubmit = (data) => {
    Cookies.set('email',data.email)
    axios
      .post(`${API_URL}/users/register/`, data)
      .then((response) => {
        if (response.status == 200) {
          Cookies.remove("id");
          Cookies.remove("token");
          navigate("/verify_otp");
        } else if (response.status == 400) {
          alert("signup failed try again");
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 403) {
          alert(error.response.data.message);
        }
      });
  };

  return (
    <div>
      <div className="register">
        <div className="card">
          {" "}
          <div className="left">
            <h1>LinkUp</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
              laborum repellat veritatis expedita aliquam obcaecati rerum,
              doloremque cum, non excepturi libero. Nesciunt, fuga?
            </p>
            <span>Do you have an Account?</span>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
          <div className="right">
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onFormSubmit)}
>
              <input
                type="text"
                className="username"
                {...register("username", {
                  required: "Username can't be empty",
                  pattern: {
                    value: /^[^_\W\s]*(_[^_\W\s]*)*$/,
                    message: "No space and characters except '_' allowed",
                  },
                })}
                placeholder="Username"
              />
              <p className="error">{errors.username?.message}</p>
              <input
                type="text"
                className="full_name"
                {...register("full_name", {
                  required: "fullname can't be empty",
                  pattern: {
                    value:
                      /^[A-Z][^\d\W_]{2}[^\d\W\s][^\d\W_!¡?÷?¿/\\+=@#$^ %ˆ&*(){}|~<>;:[\]]{0,}$/,

                    message:
                      "No space and symbols accepted excluding('.'), First letter should be capital. and More than 3 characters required.",
                  },
                })}
                placeholder="Full Name"
              />
              <p className="error">{errors.full_name?.message}</p>
              <input
              className="email"
                type="email"
                {...register("email", {
                  required: "Email field can't be empty",
                  pattern: {
                    value: /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                    message: "Invalid email format",
                  },
                })}
                placeholder="Email"
              />
               <p className="error">{errors.email?.message}</p>
              <input
                type="password"
                className="password"
                {...register("password", {
                  required: "Password can't be empty",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{}|;':",.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{}|;':",.<>\/?]{8,}$/,
                    message:
                      "criterias :  * Must be at least 8 letters  * Contain atleast one lowercase and one uppercase letter  *Contains atleast 1 digit  * Contains atleast one special character. ",
                  },
                })}
                placeholder="password"
              />
              <p className="error">{errors.password?.message}</p>
              <button>Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
