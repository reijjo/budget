import {
  ChangeEvent,
  FormEvent,
  SetStateAction,
  useState,
  Dispatch,
} from "react";
import { Link } from "react-router-dom";
// import { isAxiosError } from "axios";
import { LoginCredentials, Logged, InfoMsg } from "../utils/types";
import InfoMessage from "./common/InfoMessage";
import loginAPI from "../api/login-api";
import { isAxiosError } from "axios";
import { verifyUser } from "../utils/middleware";

interface Props {
  status: boolean;
  setSignIn: React.Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<Logged | null>>;
}

const SignIn = ({ status, setSignIn, setUser }: Props) => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    passwd: "",
  });
  const [infoMessage, setInfoMessage] = useState<InfoMsg>({
    style: "",
    message: "",
  });

  const handleLogin = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCredentials((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const forgotPw = async () => {
    verifyUser();
  };

  // Login

  const login = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const res = await loginAPI.login(credentials);
      console.log("res", res);

      window.localStorage.setItem("budgetUser", JSON.stringify(res));
      setUser(res);

      setInfoMessage({ message: "All good!", style: "info-success" });
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        setInfoMessage({
          message: error.response?.data.message,
          style: error.response?.data.style,
        });
      }
      setUser(null);
    }

    setTimeout(() => {
      setInfoMessage({ message: null });
    }, 5000);
  };

  // Return

  return (
    <div className="logo-inputs">
      <p>Sign in</p>
      <form id="form-login" onSubmit={login}>
        <div className="login-inputs">
          {/* Email input */}

          <div className="label-input">
            <label htmlFor="login-input-email">Email</label>
            <input
              type="text"
              id="login-input-email"
              placeholder="Email..."
              onChange={handleLogin}
              name="email"
              required
              autoComplete="off"
            />
          </div>

          {/* Password input */}

          <div className="label-input">
            <label htmlFor="login-input-passwd">Password</label>
            <input
              type="password"
              id="login-input-passwd"
              placeholder="Password..."
              onChange={handleLogin}
              name="passwd"
              required
              autoComplete="off"
            />
          </div>
          <div className="helper-text" style={{ marginBottom: "16px" }}>
            <a
              className="my-btn text-btn"
              style={{ marginBottom: "16px", fontSize: "0.9rem" }}
              onClick={forgotPw}
              // onClick={() => alert("not working yet")}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                }
              }}
            >
              Forgot password?
            </a>
          </div>
          <button type="submit" className="my-btn filled-btn">
            Sign in
          </button>
        </div>
      </form>

      <InfoMessage style={infoMessage.style} message={infoMessage.message} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          flexDirection: "column",
          height: "100%",
        }}
      >
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
    </div>
  );
};

export default SignIn;
