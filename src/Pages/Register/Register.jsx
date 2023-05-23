import { Link } from 'react-router-dom';
import './register.scss';

const Register = () => {
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
          <form>
            <input type="text" placeholder="Username" />
            <input type="text" placeholder="Full Name" />
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Phone" />            <input type="text" placeholder="Email" />
            <input type="password" placeholder="password" />
            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
        </div>
    );
}

export default Register;
