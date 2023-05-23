import { Link } from "react-router-dom";
import "./login.scss";

const Login = () => {
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
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="password" />
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
