import { SetStateAction } from "react";
import { Link } from "react-router-dom";

interface Props {
  // onClick?: () => void | null;
  status: boolean;
  setSignIn: React.Dispatch<SetStateAction<boolean>>;
}

const SignIn = ({ status, setSignIn }: Props) => {
  return (
    <div className="logo-inputs">
      <p>Sign in</p>
      <form id="form-login">
        <div className="login-inputs">
          <div className="label-input">
            <label htmlFor="login-input-email">Email</label>
            <input type="text" id="login-input-email" />
          </div>
          <div className="label-input">
            <label htmlFor="login-input-passwd">Password</label>
            <input type="text" id="login-input-passwd" />
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
          <div className="helper-text" style={{ textAlign: "center" }}>
            No account? Register{" "}
            <button
              className="my-btn text-btn"
              onClick={() => setSignIn(!status)}
            >
              here!
            </button>
          </div>
          <div className="helper-text" style={{ margin: "auto auto 8px auto" }}>
            Or click{" "}
            <button className="my-btn text-btn">
              <Link to="/test">here</Link>
            </button>{" "}
            to try THE BAG.
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
