import { Link } from "react-router-dom";
// import logo from "../assets/images/moneybag2-removebg.png"

const Landing = () => {
  return (
    <div id="landing">
      <Link to="#" style={{ position: "fixed", top: "0", right: "0" }}>
        Sign up
      </Link>
      <div className="landing-logo">
        <div className="logo-bg"></div>
        <div className="logo-text">
          <h1>BAG</h1>
          <p>Track your budget like a pro.</p>
          <div className="logo-inputs">
            <p>Sign in</p>
            <div className="login-inputs">
              <input />
              <input />
              <div>Forgot password?</div>
              <button>Sign in</button>
            </div>
            <div className="logo-extratext">
              <div>No account? Register here!</div>
            </div>
          </div>
        </div>
      </div>
      <Link to="/test">Click here to try it out!</Link>
    </div>
  );
};

export default Landing;
