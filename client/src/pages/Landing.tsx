import { useState } from "react";
// import SignIn from "../components/SignIn";
import { Link } from "react-router-dom";

const Landing = () => {
  const [signIn, setSignIn] = useState(true);

  return (
    <div id="landing">
      {signIn ? (
        <button
          className="my-btn outline-btn"
          style={{
            position: "fixed",
            top: "0",
            right: "0",
            margin: "12px 24px",
          }}
          onClick={() => setSignIn(!signIn)}
        >
          Sign up
        </button>
      ) : (
        <button
          className="my-btn outline-btn"
          style={{
            position: "fixed",
            top: "0",
            right: "0",
            margin: "12px 24px",
          }}
          onClick={() => setSignIn(!signIn)}
        >
          Sign in
        </button>
      )}

      <div className="landing-logo">
        <div className="logo-bg"></div>
        <div className="logo-text">
          <h1>BAG</h1>
          <p>Track your budget like a pro.</p>
          {signIn ? (
            <div className="logo-inputs">
              <p>Sign in</p>
              <form id="form-login">
                <div className="login-inputs">
                  <div className="label-input">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" />
                  </div>
                  <div className="label-input">
                    <label htmlFor="passwd">Password</label>
                    <input type="text" name="passwd" />
                  </div>
                  <div className="helper-text">
                    <button
                      className="my-btn text-btn"
                      style={{ marginBottom: "16px", fontSize: "0.9rem" }}
                    >
                      Forgot password?
                    </button>
                  </div>
                  <button type="submit" className="my-btn filled-btn">
                    Sign in
                  </button>
                  <div className="helper-text">
                    No account? Register{" "}
                    <button
                      className="my-btn text-btn"
                      onClick={() => setSignIn(!signIn)}
                    >
                      here!
                    </button>
                  </div>
                  <div
                    className="helper-text"
                    style={{ margin: "auto auto 8px auto" }}
                  >
                    Or click{" "}
                    <button className="my-btn text-btn">
                      <Link to="/test">here</Link>
                    </button>{" "}
                    to try THE BAG.
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div className="logo-inputs">
              <p>Register</p>
              <form id="form-register">
                <div className="login-inputs">
                  <div className="label-input">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" />
                  </div>
                  <div className="label-input">
                    <label htmlFor="passwd">Password</label>
                    <input type="text" name="passwd" />
                  </div>
                  <div className="label-input">
                    <label htmlFor="passwd2">Confirm password</label>
                    <input type="text" name="passwd2" />
                  </div>

                  <button
                    type="submit"
                    className="my-btn filled-btn"
                    style={{ marginTop: "16px" }}
                  >
                    Sign in
                  </button>
                  <div className="helper-text">
                    Already got an account? Sign in{" "}
                    <button
                      className="my-btn text-btn"
                      onClick={() => setSignIn(!signIn)}
                    >
                      here!
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
