import { SetStateAction } from "react";

interface Props {
  // onClick?: () => void | null;
  status: boolean;
  setSignIn: React.Dispatch<SetStateAction<boolean>>;
}

const SignUp = ({ status, setSignIn }: Props) => {
  return (
    <div className="logo-inputs">
      <p>Register</p>
      <form id="form-register">
        <div className="login-inputs">
          <div className="label-input">
            <label htmlFor="reg-input-email">Email</label>
            <input type="text" id="reg-input-email" />
          </div>
          <div className="label-input">
            <label htmlFor="reg-input-passwd">Password</label>
            <input type="text" id="reg-input-passwd" />
          </div>
          <div className="label-input">
            <label htmlFor="reg-input-passwd2">Confirm password</label>
            <input type="text" id="reg-input-passwd2" />
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
              onClick={() => setSignIn(!status)}
            >
              here!
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
